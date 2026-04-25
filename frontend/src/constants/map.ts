import type { MapPosition, CustomPosition } from '@/types/map'
import type { ControlPosition } from 'leaflet'

const LEAFLET_POSITION_CLASSES: Record<ControlPosition, string> = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
}

const CUSTOM_POSITION_STYLES: Record<CustomPosition, React.CSSProperties> = {
  centerright: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1000,
  },
  centerleft: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1000,
  },
  centertop: {
    position: 'absolute',
    top: 10,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000,
  },
  centerbottom: {
    position: 'absolute',
    bottom: 10,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000,
  },
}

const isLeafletPosition = (
  position: MapPosition,
): position is ControlPosition => {
  return position in LEAFLET_POSITION_CLASSES
}

export function getPositionProps(position: MapPosition) {
  if (isLeafletPosition(position)) {
    return { className: LEAFLET_POSITION_CLASSES[position], style: undefined }
  }
  return { className: undefined, style: CUSTOM_POSITION_STYLES[position] }
}
