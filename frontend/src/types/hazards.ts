import type { SvgIconComponent } from '@mui/icons-material'

export const HazardType = {
  EARTHQUAKE: 'earthquake',
  WILDFIRE: 'wildfire',
  ERUPTION: 'eruption',
} as const

export type HazardType = (typeof HazardType)[keyof typeof HazardType]

export type HazardMeta = {
  name: string
  muiIcon: SvgIconComponent
  color: string
  backgroundColor: string
}

export type Location = [number, number]

export const DateFilter = [
  { label: 'Last hour', value: '1h' },
  { label: 'Last 24 hours', value: '1d' },
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
  { label: 'Last 3 months', value: '3m' },
  { label: 'All', value: 'all' },
] as const

export type DateFilterOption = (typeof DateFilter)[number]

export type DateFilterValue = DateFilterOption['value']

export type HazardPositionMode = 'current' | 'map'
export type HazardPosition = {
  longitude: number
  latitude: number
}

export type USGSEarthquakeResponse = {
  type: 'FeatureCollection'
  metadata: object
  features: {
    type: 'Feature'
    id: string
    properties: {
      mag: number | null
      place: string | null
      time: number
      tsunami: number
      status: 'reviewed' | 'automatic'
      url: string
      alert: 'green' | 'yellow' | 'orange' | 'red' | null
    }
    geometry: {
      type: 'Point'
      coordinates: [number, number, number]
    }
  }[]
}

export type GVPVolcanoResponse = {
  type: 'FeatureCollection'
  features: {
    type: 'Feature'
    id: string
    properties: {
      Volcano_Number: number
      Volcano_Name: string
      Primary_Volcano_Type: string | null
      Country: string | null
      Region: string | null
      Subregion: string | null
      Elevation: number | null
      Dominant_Rock_Type: string | null
      Tectonic_Setting: string | null
      Last_Known_Eruption: string | null
    }
    geometry: {
      type: 'Point'
      coordinates: [number, number]
    }
  }[]
}

export type GVPEruptionResponse = {
  type: 'FeatureCollection'
  features: {
    type: 'Feature'
    id: string
    properties: {
      Volcano_Number: number
      Volcano_Name: string
      Eruption_Number: number
      Eruption_Category: string | null
      Start_Year: number | null
      End_Year: number | null
      VEI: number | null
      VEI_Modifier: string | null
      Evidence_Method_Dating: string | null
    }
    geometry: {
      type: 'Point'
      coordinates: [number, number]
    }
  }[]
}
