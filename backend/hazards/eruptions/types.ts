import type { FeatureCollection, Point } from 'geojson'

export type GVPEruptionResponse = FeatureCollection<Point>

// what goes INTO the database
export type EruptionDB = {
  id: string
  gvp_eruption_id: number
  gvp_volcano_id: number | null
  volcano_name: string
  eruption_area: string | null
  start_year: number | null
  start_year_uncertainty: number | null
  explosivity_index: number | null
  confirmed: boolean
  geom: string
}

export type EruptionTransformResult = Omit<EruptionDB, 'id'>

// what goes OUT to the frontend
export type EruptionDisplay = {
  id: string
  gvp_eruption_id: number
  gvp_volcano_id: number | null
  volcano_name: string
  eruption_area: string | null
  start_year: number | null
  start_year_uncertainty: number | null
  explosivity_index: number | null
  confirmed: boolean
  longitude: number
  latitude: number
}