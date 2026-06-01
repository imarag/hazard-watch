export const epochToDate = (epoch: number, type: 'ms' | 's' = 'ms') => {
  const ms = type === 's' ? epoch * 1000 : epoch
  return new Date(ms).toLocaleString()
}
