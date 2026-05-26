export const HazardType = {
  FLOOD: 'flood',
  EARTHQUAKE: 'earthquake',
  WILDFIRE: 'wildfire',
  STORM: 'storm',
} as const

export type HazardType = (typeof HazardType)[keyof typeof HazardType]
