DO $$ BEGIN
  CREATE TYPE hazard_type AS ENUM ('eruption', 'earthquake', 'wildfire', 'tsunami');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE IF NOT EXISTS users (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  password    TEXT        NOT NULL,
  email       TEXT        NOT NULL UNIQUE,
  name        TEXT        NOT NULL
);

CREATE TABLE IF NOT EXISTS posts (
  id          UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  title       VARCHAR(255) NOT NULL,
  hazard_type hazard_type  NOT NULL,
  description TEXT         NOT NULL,
  author_id   UUID         NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  geom        GEOMETRY(Point, 4326) NOT NULL
);

CREATE TABLE IF NOT EXISTS earthquakes (
  id              SERIAL      PRIMARY KEY,
  usgs_id         TEXT        NOT NULL UNIQUE,
  magnitude       NUMERIC,
  location        TEXT,
  occurred_at     TIMESTAMPTZ,
  depth_km        NUMERIC,
  triggered_tsunami BOOLEAN,
  review_status   TEXT,
  alert_level     TEXT,
  geom            GEOMETRY(Point, 4326)
);

CREATE TABLE IF NOT EXISTS eruptions (
  id                     SERIAL  PRIMARY KEY,
  gvp_eruption_id        INTEGER NOT NULL UNIQUE,
  gvp_volcano_id         INTEGER,
  volcano_name           TEXT    NOT NULL,
  eruption_area          TEXT,
  start_year             INTEGER,
  start_year_uncertainty INTEGER,
  explosivity_index      NUMERIC,
  confirmed              BOOLEAN,
  geom                   GEOMETRY(Point, 4326)
);

CREATE TABLE IF NOT EXISTS tsunamis (
  id                   SERIAL  PRIMARY KEY,
  noaa_id              INTEGER NOT NULL UNIQUE,
  location             TEXT,
  country              TEXT,
  year                 INTEGER,
  max_wave_height_m    NUMERIC,
  deaths               INTEGER,
  deaths_severity      INTEGER,
  earthquake_magnitude NUMERIC,
  cause                TEXT,
  event_validity       INTEGER,
  intensity            NUMERIC,
  region_code          INTEGER,
  geom                 GEOMETRY(Point, 4326)
);

CREATE TABLE IF NOT EXISTS wildfires (
  id                  SERIAL PRIMARY KEY,
  fire_radiative_power NUMERIC,
  brightness_temp_k   NUMERIC,
  confidence          TEXT CHECK (confidence IN ('low', 'nominal', 'high')),
  detected_at         TIMESTAMPTZ,
  time_of_day         TEXT CHECK (time_of_day IN ('day', 'night')),
  satellite           TEXT,
  geom                GEOMETRY(Point, 4326)
);

CREATE INDEX IF NOT EXISTS posts_geom_idx            ON posts        USING GIST (geom);
CREATE INDEX IF NOT EXISTS earthquakes_geom_idx      ON earthquakes  USING GIST (geom);
CREATE INDEX IF NOT EXISTS eruptions_geom_idx        ON eruptions    USING GIST (geom);
CREATE INDEX IF NOT EXISTS tsunamis_geom_idx         ON tsunamis     USING GIST (geom);
CREATE INDEX IF NOT EXISTS wildfires_geom_idx        ON wildfires    USING GIST (geom);

CREATE INDEX IF NOT EXISTS earthquakes_occurred_at_idx  ON earthquakes (occurred_at);
CREATE INDEX IF NOT EXISTS wildfires_detected_at_idx    ON wildfires   (detected_at);
CREATE INDEX IF NOT EXISTS tsunamis_year_idx            ON tsunamis    (year);

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER post_updated_at
BEFORE UPDATE ON posts
FOR EACH ROW EXECUTE FUNCTION update_updated_at();