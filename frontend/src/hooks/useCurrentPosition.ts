import { useEffect, useState, useCallback } from 'react'

type Position = {
  longitude: number
  latitude: number
}

export default function useCurrentPosition() {
  const [currPosition, setCurrPosition] = useState<Position | null>(null)

  const onFindPosition = (position: GeolocationPosition) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    setCurrPosition({ longitude, latitude })
  }

  const onErrorFindPosition = () => {
    console.error('Cannot find position')
  }

  const geoLocateUser = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        onFindPosition,
        onErrorFindPosition,
      )
    }
  }, [])

  useEffect(() => {
    geoLocateUser()
  }, [geoLocateUser])

  return currPosition
}
