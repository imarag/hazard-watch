import type { WildfireTransformResult } from '../../modules/hazards/hazards.types.js'

type WildfireSeed = Omit<WildfireTransformResult, 'geom'> & {
  lng: number
  lat: number
}

export const wildfires: WildfireSeed[] = [
  {
    fire_radiative_power: 7.03,
    brightness_temp_k: 340.48,
    confidence: 'nominal',
    detected_at: new Date('2026-06-10T00:41:00Z').toISOString(),
    time_of_day: 'day',
    satellite: 'Suomi NPP',
    lng: 77.41493,
    lat: 65.3106,
  },
  {
    fire_radiative_power: 5.96,
    brightness_temp_k: 337.09,
    confidence: 'nominal',
    detected_at: new Date('2026-06-10T00:41:00Z').toISOString(),
    time_of_day: 'day',
    satellite: 'Suomi NPP',
    lng: 77.42301,
    lat: 65.31268,
  },
  {
    fire_radiative_power: 10.23,
    brightness_temp_k: 350.55,
    confidence: 'high',
    detected_at: new Date('2026-06-10T00:41:00Z').toISOString(),
    time_of_day: 'day',
    satellite: 'Suomi NPP',
    lng: 80.44613,
    lat: 66.71246,
  },
  {
    fire_radiative_power: 8.59,
    brightness_temp_k: 348.48,
    confidence: 'high',
    detected_at: new Date('2026-06-10T00:41:00Z').toISOString(),
    time_of_day: 'day',
    satellite: 'Suomi NPP',
    lng: 75.5489,
    lat: 66.95725,
  },
  {
    fire_radiative_power: 4.05,
    brightness_temp_k: 329.14,
    confidence: 'nominal',
    detected_at: new Date('2026-06-10T00:45:00Z').toISOString(),
    time_of_day: 'day',
    satellite: 'Suomi NPP',
    lng: 24.18328,
    lat: 65.76734,
  },
  {
    fire_radiative_power: 1.01,
    brightness_temp_k: 296.02,
    confidence: 'low',
    detected_at: new Date('2026-06-10T00:48:00Z').toISOString(),
    time_of_day: 'night',
    satellite: 'Suomi NPP',
    lng: 44.52783,
    lat: 50.91008,
  },
  {
    fire_radiative_power: 1.6,
    brightness_temp_k: 314.18,
    confidence: 'nominal',
    detected_at: new Date('2026-06-10T00:48:00Z').toISOString(),
    time_of_day: 'night',
    satellite: 'Suomi NPP',
    lng: 39.6309,
    lat: 52.53411,
  },
  {
    fire_radiative_power: 8.94,
    brightness_temp_k: 337.59,
    confidence: 'high',
    detected_at: new Date('2026-06-10T00:41:00Z').toISOString(),
    time_of_day: 'day',
    satellite: 'Suomi NPP',
    lng: 67.0071,
    lat: 71.17165,
  },
]