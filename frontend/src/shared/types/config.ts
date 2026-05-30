import type {
  GlobalHazardParams,
  EarthquakeQueryParams,
  WildfireQueryParams,
  EruptionQueryParams,
  MapBounds,
  HazardType,
} from '@/features/hazards/types'
import type { FormFieldProps } from '@/shared/types/form'
import type { PostQueryParams } from '@/features/posts/types'

export type FilterParamsConfig = {
  global: Record<
    keyof Omit<GlobalHazardParams, keyof MapBounds>,
    FormFieldProps
  >
  earthquake: Record<keyof EarthquakeQueryParams, FormFieldProps>
  wildfire: Record<keyof WildfireQueryParams, FormFieldProps>
  eruption: Record<keyof EruptionQueryParams, FormFieldProps>
  posts: Record<keyof PostQueryParams, FormFieldProps>
}

export type FilterParamsDefaults = {
  global: GlobalHazardParams
  earthquake: Record<keyof EarthquakeQueryParams, number | string>
  wildfire: Record<keyof WildfireQueryParams, number | string>
  eruption: Record<keyof EruptionQueryParams, number | string>
  posts: Record<keyof PostQueryParams, HazardType>
}
