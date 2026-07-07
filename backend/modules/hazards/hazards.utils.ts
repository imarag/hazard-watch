import { logger } from "../../lib/logger.js"

export function logSyncError(label: string, err: unknown) {
  if (err instanceof Error) {
    logger.error(`[${label}] sync failed: ${err.message}`)
    if (err.cause) logger.error(`[${label}] cause: ${err.cause}`)
  } else {
    logger.error(`[${label}] sync failed: ${err}`)
  }
}