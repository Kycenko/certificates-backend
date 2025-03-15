import { Injectable, LoggerService } from '@nestjs/common'
import { createLogger, format, transports } from 'winston'
import 'winston-daily-rotate-file'

@Injectable()
export class CustomLogger implements LoggerService {
	private logger = createLogger({
		level: 'info',
		format: format.combine(
			format.timestamp(),
			format.printf(({ level, message, timestamp }) => {
				return `${timestamp} [${level.toUpperCase()}] ${message}`
			})
		),
		transports: [
			new transports.Console(),
			new transports.DailyRotateFile({
				filename: 'logs/application-%DATE%.log',
				datePattern: 'YYYY-MM-DD',
				zippedArchive: true,
				maxSize: '20m',
				maxFiles: '14d'
			})
		]
	})

	log(message: string, context?: string) {
		this.logger.info(this.formatMessage(message, context))
	}

	error(message: string, trace: string, context?: string) {
		this.logger.error(this.formatMessage(message, context), { trace })
	}

	warn(message: string, context?: string) {
		this.logger.warn(this.formatMessage(message, context))
	}

	debug(message: string, context?: string) {
		this.logger.debug(this.formatMessage(message, context))
	}

	verbose(message: string, context?: string) {
		this.logger.verbose(this.formatMessage(message, context))
	}

	private formatMessage(message: string, context?: string): string {
		return context ? `[${context}] ${message}` : message
	}
}
