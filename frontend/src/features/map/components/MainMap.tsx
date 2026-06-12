import Map from '@/features/map/components/Map'
import type { Post } from '@/features/posts/types'
import type { UseQueryResult } from '@tanstack/react-query'
import type {
  EarthquakeResponse,
  EruptionResponse,
  HazardType,
  TsunamiResponse,
  WildfireResponse,
} from '@/features/hazards/types'
import React, { useRef, useCallback } from 'react'
import type { MarkerType } from '@/features/map/types'
import { createPostTooltip } from '@/features/posts/utils'
import { postMeta } from '@/features/posts/constants'
import { hazardMeta } from '@/features/hazards/constants'
import type { FilterParamsDefaults } from '@/shared/types/config'
import type { MapBounds } from '@/features/hazards/types'

interface MainMapProps {
  postsQuery: UseQueryResult<Post[], Error>
  showPosts: boolean
  setFilterParamsDefaults: React.Dispatch<
    React.SetStateAction<FilterParamsDefaults>
  >
  loading: boolean
  hazardQueryMap: {
    earthquake: UseQueryResult<EarthquakeResponse, Error>
    wildfire: UseQueryResult<WildfireResponse, Error>
    eruption: UseQueryResult<EruptionResponse, Error>
    tsunami: UseQueryResult<TsunamiResponse, Error>
  }
  enabledHazards: HazardType[]
}

export default function MainMap({
  postsQuery,
  showPosts,
  setFilterParamsDefaults,
  loading,
  hazardQueryMap,
  enabledHazards,
}: MainMapProps) {
  const boundsTimer = useRef<ReturnType<typeof setTimeout>>(null)

  const handleMoveEnd = useCallback(
    ({ minLat, maxLat, minLng, maxLng }: MapBounds) => {
      if (boundsTimer.current) {
        clearTimeout(boundsTimer.current)
      }

      boundsTimer.current = setTimeout(() => {
        setFilterParamsDefaults((prev) => ({
          ...prev,
          global: {
            ...prev.global,
            minLat: Math.max(Math.round(minLat), -90),
            maxLat: Math.min(Math.round(maxLat), 90),
            minLng: Math.max(Math.round(minLng), -180),
            maxLng: Math.min(Math.round(maxLng), 180),
          },
        }))
      }, 500)
    },
    [setFilterParamsDefaults],
  )

  const hazardMarkers = (
    Object.entries(hazardQueryMap) as [
      HazardType,
      (typeof hazardQueryMap)[HazardType],
    ][]
  )
    .filter(([hazard]) => enabledHazards.includes(hazard))
    .filter(([_, query]) => query.data !== undefined)
    .map(([hazard, query]) =>
      query.data?.data.features
        ? query.data.data.features.map((feature, ind) => {
            const [lon, lat] = feature.geometry.coordinates
            return {
              id: String(ind),
              coords: { lat, lon },
              tooltip: feature.properties,
              icon: hazardMeta[hazard].muiIcon,
            } satisfies MarkerType
          })
        : [],
    )

  const postsMarkers: MarkerType[] = showPosts
    ? (postsQuery.data?.map((post) => ({
        id: String(post.id),
        coords: { lat: post.latitude, lon: post.longitude },
        tooltip: createPostTooltip(post),
        icon: postMeta.muiIcon,
      })) ?? [])
    : []

  const markers = [...hazardMarkers, postsMarkers]

  return (
    <Map
      height='100%'
      zoom={3}
      zoomControl={false}
      attributionControl={false}
      buttonIconSize='large'
      markers={markers}
      loading={loading}
      onMoveEnd={handleMoveEnd}
    />
  )
}
