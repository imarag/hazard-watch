export interface TsunamiDisplayProperties {
  locationName: string | null
  country: string | null
  year: number
  maxWaterHeight: number | null // meters — most tangible severity metric
  deaths: number | null // actual count when available
  deathsAmountOrder: number | null // 0-4 scale when exact count not available
  eqMagnitude: number | null // cause magnitude
  causeCode: number // what triggered it
  eventValidity: number // how reliable the record is
}
