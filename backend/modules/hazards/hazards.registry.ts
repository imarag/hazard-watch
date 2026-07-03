import config from '../../lib/config.ts'
import {
  getEarthquakes,
  getEruptions,
  getTsunamis,
  getWildfires,
} from './hazards.service.ts'

export const HAZARDS_REGISTRY = {
  earthquake: {
    name: 'Earthquake',
    icon: 'activity',
    table: 'earthquakes',
    externalIdColumn: 'usgs_id',
    provider: {
      name: 'USGS Earthquake Hazards Program',
      url: 'https://earthquake.usgs.gov',
      description:
        'Real-time earthquake data from the USGS National Earthquake Information Center',
      baseUrl: 'https://earthquake.usgs.gov/fdsnws/event/1/query',
      defaults: { format: 'geojson' },
    },
    fetchFn: getEarthquakes,
  },
  eruption: {
    name: 'Volcanic Eruption',
    icon: 'mountain',
    table: 'eruptions',
    externalIdColumn: 'gvp_eruption_id',
    provider: {
      name: 'Smithsonian Institution Global Volcanism Program',
      url: 'https://volcano.si.edu',
      description:
        'Holocene volcanic eruption data from the Smithsonian GVP database',
      baseUrl: 'https://webservices.volcano.si.edu/geoserver/GVP-VOTW/ows',
      defaults: {
        service: 'WFS',
        version: '1.1.0',
        request: 'GetFeature',
        outputFormat: 'application/json',
        typeName: 'GVP-VOTW:Smithsonian_VOTW_Holocene_Eruptions',
      },
    },
    fetchFn: getEruptions,
  },
  tsunami: {
    name: 'Tsunami',
    icon: 'waves',
    table: 'tsunamis',
    externalIdColumn: 'noaa_id',
    provider: {
      name: 'NOAA National Centers for Environmental Information',
      url: 'https://www.ngdc.noaa.gov/hazel',
      description: 'Global historical tsunami database from NOAA NCEI',
      baseUrl:
        'https://www.ngdc.noaa.gov/hazel/hazard-service/api/v1/tsunamis/events',
      defaults: { minEventValidity: '3', itemsPerPage: '200' },
    },
    fetchFn: getTsunamis,
  },
  wildfire: {
    name: 'Wildfire',
    icon: 'flame',
    table: 'wildfires',
    externalIdColumn: null, // dedup via (detected_at, geom) unique index
    provider: {
      name: 'NASA FIRMS',
      url: 'https://firms.modaps.eosdis.nasa.gov',
      description: 'Near real-time active fire data from NASA VIIRS satellite',
      baseUrl: 'https://firms.modaps.eosdis.nasa.gov/api/area/csv',
      apiKey: config.FIRMS_MAP_KEY,
      defaults: { source: 'VIIRS_SNPP_NRT', dayRange: '3' },
    },
    fetchFn: getWildfires,
  },
} as const

export type HazardType = keyof typeof HAZARDS_REGISTRY
export const HAZARD_TYPES = Object.keys(HAZARDS_REGISTRY) as HazardType[]
export type Hazard = (typeof HAZARDS_REGISTRY)[HazardType]
