import L from 'leaflet'
import type { HazardType } from '@/types/hazards'
import { hazardMeta } from '../constants/hazards'

export const createHazardIcon = (hazardType: HazardType) => {
  return L.icon({
    iconUrl: hazardMeta[hazardType]['svgUrl'],
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  })
}
