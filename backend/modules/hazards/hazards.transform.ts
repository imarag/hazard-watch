import type {
  USGSEarthquakeResponse,
  GVPEruptionResponse,
  EarthquakeTransformResult,
  EruptionTransformResult,
  TsunamiTransformResult,
  WildfireTransformResult,
} from './hazards.types.js'
import { type FIRMSWildfireResponse } from './hazards.schemas.js'
import { toNumber } from '../../lib/utils.js'
import * as earthquakeUtils from './utils/earthquake.utils.js'
import * as eruptionUtils from './utils/eruption.utils.js'
import * as tsunamisUtils from './utils/tsunami.utils.js'
import * as wildfireUtils from './utils/wildfire.utils.js'

export function transformEarthquakes(
  data: USGSEarthquakeResponse,
): EarthquakeTransformResult[] {
  return data.features
    .filter((f) => f.properties !== null && f.id != null)
    .map((f) => {
      const [lon, lat, depth] = f.geometry.coordinates
      const props = f.properties!

      return {
        usgs_id: String(f.id),
        magnitude: toNumber(props['mag']),
        magnitude_type: earthquakeUtils.getMagnitudeType(props['magType']),
        location: props['place'] ?? null,
        occurred_at: earthquakeUtils.getOccurredAt(props['time']),
        depth_km: toNumber(depth),
        depth_class: earthquakeUtils.getDepthClass(depth),
        triggered_tsunami: earthquakeUtils.getTsunamiInfo(props['tsunami']),
        alert: earthquakeUtils.getAlertInfo(props['alert']),
        geom: `SRID=4326;POINT(${lon} ${lat})`,
      } satisfies EarthquakeTransformResult
    })
}

export function transformEruptions(
  raw: GVPEruptionResponse,
): EruptionTransformResult[] {
  return raw.features
    .filter(
      (f) =>
        f.properties !== null &&
        f.geometry !== null &&
        f.properties['Eruption_Number'] != null,
    )
    .map((f) => {
      const props = f.properties!
      const [lon, lat] = f.geometry.coordinates
      const vei = toNumber(props['ExplosivityIndexMax'])
      const startYear = toNumber(props['StartDateYear'])

      return {
        gvp_eruption_id: toNumber(props['Eruption_Number'])!,
        gvp_volcano_id: toNumber(props['Volcano_Number']),
        volcano_name: props['Volcano_Name'] ?? null,
        eruption_area: props['ActivityArea'] ?? null,
        start_year: startYear,
        start_year_display: eruptionUtils.getEraYear(startYear),
        start_year_uncertainty: toNumber(props['StartDateYearUncertainty']),
        explosivity_index: vei,
        explosivity_label: eruptionUtils.getExplosivityLabel(vei),
        confirmed: props['Activity_Type'] === 'Confirmed Eruption',
        geom: `SRID=4326;POINT(${lon} ${lat})`,
      } satisfies EruptionTransformResult
    })
}

export function transformTsunamis(
  items: Record<string, unknown>[],
): TsunamiTransformResult[] {
  return items
    .filter(
      (item) =>
        item['id'] != null &&
        item['latitude'] != null &&
        item['longitude'] != null,
    )
    .map((item) => {
      const deathsSeverity =
        toNumber(item['deathsAmountOrder']) ??
        toNumber(item['deathsAmountOrderTotal'])

      return {
        noaa_id: toNumber(item['id'])!,
        location: (item['locationName'] as string) ?? null,
        country: (item['country'] as string) ?? null,
        year: toNumber(item['year']),
        max_wave_height_m: toNumber(item['maxWaterHeight']),
        deaths: toNumber(item['deathsTotal']) ?? toNumber(item['deaths']),
        deaths_severity: deathsSeverity,
        deaths_severity_label:
          tsunamisUtils.getDeathsSeverityLabel(deathsSeverity),
        earthquake_magnitude: toNumber(item['eqMagnitude']),
        cause: tsunamisUtils.getCause(toNumber(item['causeCode'])),
        geom: `SRID=4326;POINT(${item['longitude']} ${item['latitude']})`,
      } satisfies TsunamiTransformResult
    })
}

export function transformWildfires(
  raw: FIRMSWildfireResponse,
): WildfireTransformResult[] {
  return raw.map(
    (r) =>
      ({
        fire_radiative_power: r.frp ?? null,
        brightness_temp_k: r.bright_ti4 ?? null,
        confidence: wildfireUtils.parseConfidence(r.confidence),
        detected_at: wildfireUtils.parseDetectedAt(r.acq_date, r.acq_time),
        time_of_day: r.daynight === 'D' ? 'day' : 'night',
        satellite: wildfireUtils.getSatelliteName(r.satellite),
        geom: `SRID=4326;POINT(${r.longitude} ${r.latitude})`,
      }) satisfies WildfireTransformResult,
  )
}
