export const HazardType = {
  EARTHQUAKE: 'earthquake',
  ERUPTION: 'eruption',
  WILDFIRE: 'wildfire',
  TSUNAMI: 'tsunami',
} as const

export type HazardType = (typeof HazardType)[keyof typeof HazardType]
