export interface WildfireDisplayProperties {
  frp: number // Fire Radiative Power, MW
  brightness: number // Kelvin
  confidence: 'low' | 'nominal' | 'high'
  acquiredAt: number // unix ms, UTC
  daynight: 'day' | 'night'
  satellite: string
}
