import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { useContainer } from 'class-validator'
import { AppModule } from './core/app.module'
import { CustomLogger } from './shared/utils/custom-logger'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.useLogger(new CustomLogger())

	const configService = app.get(ConfigService)

	app.enableCors({ credentials: true })

	useContainer(app.select(AppModule), { fallbackOnErrors: true })

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true
		})
	)

	await app.listen(configService.get<number>('PORT') ?? 7777)
}
bootstrap()
