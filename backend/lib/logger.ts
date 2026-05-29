import winston from 'winston'

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ level, message, timestamp, stack }) => {
      return stack
        ? `[${timestamp}] ${level}: ${stack}`
        : `[${timestamp}] ${level}: ${message}`
    }),
  ),
  transports: [new winston.transports.Console()],
})
