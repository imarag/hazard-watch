export type WildfireDB = {
  id: string
  fire_radiative_power: number | null
  brightness_temp_k: number | null
  confidence: 'low' | 'nominal' | 'high' | null
  detected_at: string | null
  time_of_day: 'day' | 'night' | null
  satellite: string | null
  geom: string
}

export type WildfireTransformResult = Omit<WildfireDB, 'id'>

export type WildfireDisplay = {
  id: string
  fire_radiative_power: number | null
  brightness_temp_k: number | null
  confidence: 'low' | 'nominal' | 'high' | null
  detected_at: string | null
  time_of_day: 'day' | 'night' | null
  satellite: string | null
  longitude: number
  latitude: number
}