export const HazardType = {
  EARTHQUAKE: 'earthquake',
  ERUPTION: 'eruption',
  WILDFIRE: 'wildfire',
} as const

export type HazardType = (typeof HazardType)[keyof typeof HazardType]

