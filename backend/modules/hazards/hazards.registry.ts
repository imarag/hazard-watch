import { type HazardType } from './hazards.static.js'
import {
  getEarthquakes,
  getEruptions,
  getTsunamis,
  getWildfires,
} from './hazards.service.js'

export const HAZARD_FETCHERS = {
  earthquake: getEarthquakes,
  eruption: getEruptions,
  tsunami: getTsunamis,
  wildfire: getWildfires,
} as const satisfies Record<HazardType, unknown>