import { epochToIsoDate } from '../../lib/utils.ts'
import type {
  EarthquakeTransformResult,
  USGSEarthquakeResponse,
  GVPEruptionResponse,
  EruptionTransformResult,
  TsunamiTransformResult,
  FIRMSWildfireResponse,
  WildfireTransformResult,
} from './hazards.types.js'
import { toInt } from '../../lib/utils.ts'

export function transformEarthquakes(
  data: USGSEarthquakeResponse,
): EarthquakeTransformResult[] {
  return data.features
    .filter((f) => f.properties !== null)
    .map((f) => {
      const [lon, lat, depth] = f.geometry.coordinates
      const props = f.properties!
      return {
        usgs_id: String(f.id),
        magnitude: props['mag'] ?? null,
        location: props['place'] ?? null,
        occurred_at: props['time'] ? epochToIsoDate(props['time'], 'ms') : null,
        depth_km: depth ?? null,
        triggered_tsunami: props['tsunami'] === 1,
        review_status: props['status'] ?? null,
        alert_level: props['alert'] ?? null,
        geom: `SRID=4326;POINT(${lon} ${lat})`,
      } satisfies EarthquakeTransformResult
    })
}

export function transformEruptions(
  raw: GVPEruptionResponse,
): EruptionTransformResult[] {
  return raw.features
    .filter((f) => f.properties !== null && f.geometry !== null)
    .map((f) => {
      const props = f.properties!
      const [lon, lat] = f.geometry.coordinates
      return {
        gvp_eruption_id: toInt(props['Eruption_Number'])!,
        gvp_volcano_id: toInt(props['Volcano_Number']),
        volcano_name: props['Volcano_Name'] as string,
        eruption_area: (props['ActivityArea'] as string) ?? null,
        start_year: toInt(props['StartDateYear']),
        start_year_uncertainty: toInt(props['StartDateYearModifier']),
        explosivity_index: toInt(props['ExplosivityIndexMax']),
        confirmed: props['Activity_Type'] === 'Confirmed Eruption',
        geom: `SRID=4326;POINT(${lon} ${lat})`,
      } satisfies EruptionTransformResult
    })
}

const CAUSE_CODE_MAP: Record<number, string> = {
  0: 'Unknown',
  1: 'Earthquake',
  2: 'Questionable Earthquake',
  3: 'Earthquake and Landslide',
  4: 'Volcano and Earthquake',
  5: 'Volcano, Earthquake, and Landslide',
  6: 'Volcano',
  7: 'Volcano and Landslide',
  8: 'Landslide',
  9: 'Meteorological',
  10: 'Explosion',
  11: 'Astronomical Tide',
}

export function transformTsunamis(
  items: Record<string, unknown>[],
): TsunamiTransformResult[] {
  return items
    .filter((item) => item['latitude'] != null && item['longitude'] != null)
    .filter((item) => item['latitude'] != null && item['longitude'] != null)
    .map((item) => ({
      noaa_id: item['id'] as number,
      location: (item['locationName'] as string) ?? null,
      country: (item['country'] as string) ?? null,
      year: (item['year'] as number) ?? null,
      max_wave_height_m: (item['maxWaterHeight'] as number) ?? null,
      deaths:
        (item['deathsTotal'] as number) ?? (item['deaths'] as number) ?? null,
      deaths_severity: (item['deathsAmountOrder'] as number) ?? null,
      earthquake_magnitude: (item['eqMagnitude'] as number) ?? null,
      cause: CAUSE_CODE_MAP[item['causeCode'] as number] ?? 'Unknown',
      event_validity: (item['eventValidity'] as number) ?? null,
      intensity: (item['tsIntensity'] as number) ?? null,
      region_code: (item['regionCode'] as number) ?? null,
      geom: `SRID=4326;POINT(${item['longitude']} ${item['latitude']})`,
    }))
}

const CONFIDENCE_MAP = { l: 'low', n: 'nominal', h: 'high' } as const

const parseConfidence = (raw: string): 'low' | 'nominal' | 'high' => {
  if (raw in CONFIDENCE_MAP)
    return CONFIDENCE_MAP[raw as keyof typeof CONFIDENCE_MAP]
  const n = Number(raw)
  if (!Number.isFinite(n)) return 'nominal'
  if (n >= 80) return 'high'
  if (n >= 30) return 'nominal'
  return 'low'
}

const parseDetectedAt = (date: string, time: number): string => {
  const padded = String(time).padStart(4, '0')
  return `${date}T${padded.slice(0, 2)}:${padded.slice(2, 4)}:00Z`
}

export function transformWildfires(
  raw: FIRMSWildfireResponse,
): WildfireTransformResult[] {
  return raw.map((r) => ({
    fire_radiative_power: r.frp ?? null,
    brightness_temp_k: r.bright_ti4 ?? null,
    confidence: parseConfidence(r.confidence),
    detected_at: parseDetectedAt(r.acq_date, r.acq_time),
    time_of_day: r.daynight === 'D' ? 'day' : 'night',
    satellite: r.satellite ?? null,
    geom: `SRID=4326;POINT(${r.longitude} ${r.latitude})`,
  }))
}
