import type { GVPEruptionResponse } from './types.ts'
import type { EruptionTransformResult } from './types.ts'
import { toInt } from '../../lib/utils.ts'

export function transformEruptions(
  raw: GVPEruptionResponse,
): EruptionTransformResult[] {
  return raw.features
    .filter((f) => f.properties !== null && f.geometry !== null)
    .map((f) => {
      const props = f.properties!
      const [lon, lat] = f.geometry.coordinates
      return {
        gvp_eruption_id: toInt(props['Eruption_Number'])!,
        gvp_volcano_id: toInt(props['Volcano_Number']),
        volcano_name: props['Volcano_Name'] as string,
        eruption_area: (props['ActivityArea'] as string) ?? null,
        start_year: toInt(props['StartDateYear']),
        start_year_uncertainty: toInt(props['StartDateYearModifier']),
        explosivity_index: toInt(props['ExplosivityIndexMax']),
        confirmed: props['Activity_Type'] === 'Confirmed Eruption',
        geom: `SRID=4326;POINT(${lon} ${lat})`,
      } satisfies EruptionTransformResult
    })
}
