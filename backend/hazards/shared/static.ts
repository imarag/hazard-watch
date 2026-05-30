import config from '../../lib/config.ts'

export const providers = {
  usgs: {
    earthquakes: {
      baseUrl: 'https://earthquake.usgs.gov/fdsnws/event/1/query',
      defaults: {
        format: 'geojson',
      },
    },
  },
  gvp: {
    eruptions: {
      baseUrl: 'https://webservices.volcano.si.edu/geoserver/GVP-VOTW/ows',
      defaults: {
        service: 'WFS',
        version: '1.1.0',
        request: 'GetFeature',
        outputFormat: 'application/json',
        typeName: 'GVP-VOTW:Smithsonian_VOTW_Holocene_Eruptions',
        maxFeatures: 500,
      },
    },
  },
  firms: {
    wildfires: {
      baseUrl: `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${config.FIRMS_MAP_KEY}`,
      defaults: {
        source: 'VIIRS_SNPP_NRT',
        dayRange: 1,
      },
    },
  },
} as const
