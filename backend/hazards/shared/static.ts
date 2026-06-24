import config from '../../lib/config.ts'

export const providers = {
  usgs: {
    earthquakes: {
      baseUrl: 'https://earthquake.usgs.gov/fdsnws/event/1/query',
      defaults: {
        format: 'geojson',
      },
      info: {
        source: 'USGS Earthquake Hazards Program',
        sourceUrl: 'https://earthquake.usgs.gov',
        description:
          'Real-time earthquake data from the USGS National Earthquake Information Center',
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
      },
      info: {
        source: 'Smithsonian Institution Global Volcanism Program',
        sourceUrl: 'https://volcano.si.edu',
        description:
          'Holocene volcanic eruption data from the Smithsonian GVP database',
      },
    },
  },
  firms: {
    wildfires: {
      baseUrl: `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${config.FIRMS_MAP_KEY}`,
      defaults: {
        source: 'VIIRS_SNPP_NRT',
        dayRange: '3',
      },
      info: {
        source: 'NASA FIRMS',
        sourceUrl: 'https://firms.modaps.eosdis.nasa.gov',
        description:
          'Near real-time active fire data from NASA VIIRS satellite',
      },
    },
  },
  noaa: {
    tsunamis: {
      baseUrl:
        'https://www.ngdc.noaa.gov/hazel/hazard-service/api/v1/tsunamis/events',
      defaults: {
        minEventValidity: '3',
        itemsPerPage: '200',
      },
      info: {
        source: 'NOAA National Centers for Environmental Information',
        sourceUrl: 'https://www.ngdc.noaa.gov/hazel',
        description: 'Global historical tsunami database from NOAA NCEI',
      },
    },
  },
} as const
