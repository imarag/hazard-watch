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
    volcanoes: {
      baseUrl: 'https://webservices.volcano.si.edu/geoserver/GVP-VOTW/ows',
      defaults: {
        service: 'WFS',
        version: '1.1.0',
        request: 'GetFeature',
        outputFormat: 'application/json',
        typeName: 'GVP-VOTW:Smithsonian_VOTW_Holocene_Volcanoes',
      },
    },
    eruptions: {
      baseUrl: 'https://webservices.volcano.si.edu/geoserver/GVP-VOTW/ows',
      defaults: {
        service: 'WFS',
        version: '1.1.0',
        request: 'GetFeature',
        outputFormat: 'application/json',
        typeName: 'GVP-VOTW:Smithsonian_VOTW_Holocene_Eruptions',
      },
    },
  },
} as const
