export { HAZARDS_REGISTRY, type HazardType, HAZARD_TYPES } from './hazards.registry.js'
export {
  EarthquakeQueryParamsSchema,
  WildfireQueryParamsSchema,
  TsunamiQueryParamsSchema,
  EruptionQueryParamsSchema,
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
} from './hazards.sync.ts'
export {type MapQueryParams } from './hazards.types.js'
