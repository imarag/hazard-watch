import type { EarthquakeDisplayProperties, EruptionDisplayProperties } from '../types/hazards.ts'
import type { USGSEarthquakeResponse, GVPEruptionResponse } from '../models/hazards.ts'
import type { Feature, FeatureCollection, Point } from 'geojson'
import type { FIRMSWildfireResponse } from '../models/hazards.ts'
import type { WildfireDisplayProperties } from '../types/hazards.ts'

export const mapEarthquake = (
  raw: USGSEarthquakeResponse,
): FeatureCollection<Point, EarthquakeDisplayProperties> => ({
  type: 'FeatureCollection',
  features: raw.features.map((f): Feature<Point, EarthquakeDisplayProperties> => ({
    type: 'Feature',
    geometry: f.geometry,
    properties: {
      magnitude: f.properties.mag,
      place: f.properties.place,
      time: f.properties.time,
      depth: f.geometry.coordinates[2],
      tsunami: f.properties.tsunami === 1,
      alert: f.properties.alert,
      url: f.properties.url,
    },
  })),
})

export const mapEruption = (
  raw: GVPEruptionResponse,
): FeatureCollection<Point, EruptionDisplayProperties> => ({
  type: 'FeatureCollection',
  features: raw.features.map((f): Feature<Point, EruptionDisplayProperties> => ({
    type: 'Feature',
    geometry: f.geometry,
    properties: {
      volcanoName: f.properties.Volcano_Name,
      activityArea: f.properties.ActivityArea,
      startYear: f.properties.StartDateYear,
      startYearUncertainty: f.properties.StartDateYearUncertainty,
      startYearModifier: f.properties.StartDateYearModifier,
      explosivityIndex: f.properties.ExplosivityIndexMax,
      confirmed: f.properties.Activity_Type === 'Confirmed Eruption',
    },
  })),
})

const CONFIDENCE_MAP = { l: 'low', n: 'nominal', h: 'high' } as const

const SATELLITE_MAP: Record<string, string> = {
  N: 'Suomi NPP',
  '1': 'NOAA-20',
  '2': 'NOAA-21',
  Terra: 'Terra',
  Aqua: 'Aqua',
}

const parseAcquiredAt = (date: string, time: string): number => {
  // "2026-05-28" + "1" → 2026-05-28T00:01:00Z
  // "2026-05-28" + "1234" → 2026-05-28T12:34:00Z
  const padded = time.padStart(4, '0')
  return Date.parse(`${date}T${padded.slice(0, 2)}:${padded.slice(2, 4)}:00Z`)
}

const parseConfidence = (raw: string): 'low' | 'nominal' | 'high' => {
  if (raw in CONFIDENCE_MAP) return CONFIDENCE_MAP[raw as keyof typeof CONFIDENCE_MAP]
  const n = Number(raw)
  if (!Number.isFinite(n)) return 'nominal'
  if (n >= 80) return 'high'
  if (n >= 30) return 'nominal'
  return 'low'
}

export const mapWildfire = (
  raw: FIRMSWildfireResponse,
): FeatureCollection<Point, WildfireDisplayProperties> => ({
  type: 'FeatureCollection',
  features: raw.map((r): Feature<Point, WildfireDisplayProperties> => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [r.longitude, r.latitude],
    },
    properties: {
      frp: r.frp,
      brightness: r.bright_ti4,
      confidence: parseConfidence(r.confidence),
      acquiredAt: parseAcquiredAt(r.acq_date, r.acq_time),
      daynight: r.daynight === 'D' ? 'day' : 'night',
      satellite: SATELLITE_MAP[r.satellite] ?? r.satellite,
      instrument: r.instrument,
    },
  })),
})