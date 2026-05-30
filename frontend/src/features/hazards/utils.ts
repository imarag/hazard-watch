export function extractFormValues<T>(
  config: Record<string, Record<string, { value: unknown }>>,
) {
  return Object.fromEntries(
    Object.keys(config).map((key) => [
      key,
      Object.fromEntries(
        Object.keys(config[key]).map((option) => [
          option,
          config[key][option].value,
        ]),
      ),
    ]),
  ) as T
}

export const daysAgo = (days: number): string => {
  const d = new Date()
  d.setUTCDate(d.getUTCDate() - days)
  return d.toISOString().split('T')[0] // "2026-05-27"
}
