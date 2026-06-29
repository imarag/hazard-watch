import Map from '@/features/map/components/Map'
import type {
  EruptionDisplayProperties,
  EarthquakeDisplayProperties,
  Layer,
  MapBounds,
  TsunamiDisplayProperties,
  WildfireDisplayProperties,
} from '@/features/layers/types'
import React, { useRef, useCallback } from 'react'
import { layerMeta } from '@/features/layers/constants'
import { type FilterParamsConfig } from '../config'
import type { UseQueryResult } from '@tanstack/react-query'
import type { NumberFieldProps } from '@/shared/types/form'
import type { LegendItem } from '@/features/map/types'

interface MainMapProps {
  setFilterParams: React.Dispatch<React.SetStateAction<FilterParamsConfig>>
  enabledLayers: Layer[]
  loading: boolean
  layerQuery: UseQueryResult<
    Partial<{
      earthquake: EarthquakeDisplayProperties[]
      eruption: EruptionDisplayProperties[]
      wildfire: WildfireDisplayProperties[]
      tsunami: TsunamiDisplayProperties[]
      post: any
    }>,
    Error
  >
}

export default function MainMap({
  setFilterParams,
  enabledLayers,
  loading,
  layerQuery,
}: MainMapProps) {
  const boundsTimer = useRef<ReturnType<typeof setTimeout>>(null)

  const updateBounds = useCallback(
    ({ minLat, maxLat, minLng, maxLng }: MapBounds) => {
      setFilterParams((prev) => ({
        ...prev,
        global: {
          ...prev.global,
          minLat: {
            ...prev.global.minLat,
            value: Math.max(minLat, -90),
          } as NumberFieldProps,
          maxLat: {
            ...prev.global.maxLat,
            value: Math.min(maxLat, 90),
          } as NumberFieldProps,
          minLng: {
            ...prev.global.minLng,
            value: Math.max(minLng, -180),
          } as NumberFieldProps,
          maxLng: {
            ...prev.global.maxLng,
            value: Math.min(maxLng, 180),
          } as NumberFieldProps,
        },
      }))
    },
    [setFilterParams],
  )

  const handleMoveEnd = useCallback(
    (bounds: MapBounds) => {
      if (boundsTimer.current) {
        clearTimeout(boundsTimer.current)
      }
      boundsTimer.current = setTimeout(() => updateBounds(bounds), 800)
    },
    [updateBounds],
  )

  const markerGroups = layerQuery.data
    ? Object.entries(layerQuery.data)
        .filter(([layer]) => enabledLayers.includes(layer as Layer))
        .map(([layer, layerData]) =>
          layerData.map((dataObj) => ({
            id: String(dataObj.id),
            coords: { lat: dataObj.latitude, lng: dataObj.longitude },
            tooltip: dataObj,
            icon: layerMeta[layer as Layer].muiIcon,
            color: layerMeta[layer as Layer].backgroundColor,
          })),
        )
    : []

  const legendItems: LegendItem[] = layerQuery.data
    ? Object.entries(layerQuery.data)
        .filter(([layerName]) => enabledLayers.includes(layerName as Layer))
        .map(([layerName, layerData]) => ({
          icon: layerMeta[layerName as Layer].icon, // adjust to your actual layerMeta shape
          label: layerMeta[layerName as Layer].name, // adjust to your actual layerMeta shape
          count: layerData?.length ?? 0,
        }))
    : []

  return (
    <Map
      height='100%'
      zoom={3}
      zoomControl={false}
      attributionControl={false}
      buttonIconSize='large'
      markers={markerGroups}
      loading={loading}
      onMoveEnd={handleMoveEnd}
      onMapReady={updateBounds}
      legendTitle='Active Layers'
      legendItems={legendItems}
    />
  )
}
