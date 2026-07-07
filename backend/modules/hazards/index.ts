export { type HazardType, HAZARD_TYPES, HAZARDS } from './hazards.static.js'
export { HAZARD_FETCHERS } from './hazards.registry.js'
export {
  EarthquakeQueryParamsSchema,
  WildfireQueryParamsSchema,
  TsunamiQueryParamsSchema,
  EruptionQueryParamsSchema,
  BaseHazardQueryParamsSchema,
  type BaseHazardQueryParams,
  LongitudeSchema,
  LatitudeSchema
} from './hazards.schemas.js'
export {
  getEarthquakes,
  getWildfires,
  getEruptions,
  getTsunamis,
} from './hazards.service.js'
export {
  syncEarthquakes,
  syncWildfires,
  syncTsunamis,
  syncEruptions,
  cleanHazards
} from './hazards.sync.js'