import { layerMeta } from './constants'

export const filterParamsConfig = {
  global: {
    timeRange: {
      id: 'time-range',
      type: 'select' as const,
      label: 'Time range',
      value: '3d',
      options: [
        { label: 'Last 1 hour', value: '1h' },
        { label: 'Last 6 hours', value: '6h' },
        { label: 'Last 12 hours', value: '12h' },
        { label: 'Last 24 hours', value: '24h' },
        { label: 'Last 3 days', value: '3d' },
        { label: 'Last 7 days', value: '7d' },
        { label: 'Last 30 days', value: '30d' },
      ],
      size: 'small' as const,
    },
    minLat: { id: 'min-lat', type: 'number' as const, label: 'Min Latitude', value: null as number | null, size: 'small' as const },
    maxLat: { id: 'max-lat', type: 'number' as const, label: 'Max Latitude', value: null as number | null, size: 'small' as const },
    minLng: { id: 'min-lng', type: 'number' as const, label: 'Min Longitude', value: null as number | null, size: 'small' as const },
    maxLng: { id: 'max-lng', type: 'number' as const, label: 'Max Longitude', value: null as number | null, size: 'small' as const },
  },
  earthquake: {
    minMagnitude: { id: 'min-magnitude', type: 'number' as const, label: 'Min magnitude', value: 4, min: 1, max: 10, size: 'small' as const },
    maxMagnitude: { id: 'max-magnitude', type: 'number' as const, label: 'Max magnitude', value: 10, min: 2, max: 10, size: 'small' as const },
    minDepth: { id: 'min-depth', type: 'number' as const, label: 'Min depth (km)', value: 0, min: 0, max: 1000, size: 'small' as const },
    maxDepth: { id: 'max-depth', type: 'number' as const, label: 'Max depth (km)', value: 700, min: 1, max: 1000, size: 'small' as const },
    alertLevel: {
      id: 'alert-level',
      type: 'select' as const,
      label: 'Alert level',
      value: '',
      options: [
        { label: 'Any', value: '' },
        { label: 'Green', value: 'green' },
        { label: 'Yellow', value: 'yellow' },
        { label: 'Orange', value: 'orange' },
        { label: 'Red', value: 'red' },
      ],
      size: 'small' as const,
    },
    triggeredTsunami: {
      id: 'triggered-tsunami',
      type: 'select' as const,
      label: 'Triggered tsunami',
      value: '',
      options: [
        { label: 'Any', value: '' },
        { label: 'Yes', value: 'true' },
        { label: 'No', value: 'false' },
      ],
      size: 'small' as const,
    },
  },
  wildfire: {
    minFireRadiativePower: { id: 'min-frp', type: 'number' as const, label: 'Min fire power (MW)', value: 0, min: 0, max: 10000, size: 'small' as const },
    confidence: {
      id: 'confidence',
      type: 'select' as const,
      label: 'Confidence',
      value: '',
      options: [
        { label: 'Any', value: '' },
        { label: 'Low', value: 'low' },
        { label: 'Nominal', value: 'nominal' },
        { label: 'High', value: 'high' },
      ],
      size: 'small' as const,
    },
    timeOfDay: {
      id: 'time-of-day',
      type: 'select' as const,
      label: 'Time of day',
      value: '',
      options: [
        { label: 'Any', value: '' },
        { label: 'Day', value: 'day' },
        { label: 'Night', value: 'night' },
      ],
      size: 'small' as const,
    },
  },
  eruption: {
    confirmedOnly: {
      id: 'confirmed-only',
      type: 'select' as const,
      label: 'Activity type',
      value: 'true',
      options: [
        { label: 'Confirmed only', value: 'true' },
        { label: 'All eruptions', value: 'false' },
      ],
      size: 'small' as const,
    },
    minExplosivity: { id: 'min-explosivity', type: 'number' as const, label: 'Min explosivity (VEI)', value: 0, min: 0, max: 8, size: 'small' as const },
  },
  tsunami: {
    minMaxWaterHeight: { id: 'min-water-height', type: 'number' as const, label: 'Min wave height (m)', value: 0, min: 0, max: 100, size: 'small' as const },
    minDeathsAmountOrder: {
      id: 'min-deaths',
      type: 'select' as const,
      label: 'Min casualties',
      value: '0',
      options: [
        { label: 'Any', value: '0' },
        { label: 'Few (1-50)', value: '1' },
        { label: 'Some (51-100)', value: '2' },
        { label: 'Many (101-1000)', value: '3' },
        { label: 'Very many (1000+)', value: '4' },
      ],
      size: 'small' as const,
    },
    cause: {
      id: 'cause',
      type: 'select' as const,
      label: 'Cause',
      value: '',
      options: [
        { label: 'Any', value: '' },
        { label: 'Earthquake', value: 'earthquake' },
        { label: 'Volcano', value: 'volcano' },
        { label: 'Landslide', value: 'landslide' },
      ],
      size: 'small' as const,
    },
  },
  post: {
    hazardType: {
      id: 'hazard-type',
      type: 'select' as const,
      label: 'Hazard Type',
      value: '',
      options: [
        { label: 'All', value: '' },
        ...Object.entries(layerMeta).map(([value, { name }]) => ({
          label: name,
          value,
        })),
      ],
      size: 'small' as const,
    },
  },
}

export type FilterParamsConfig = typeof filterParamsConfig