import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { useContainer } from 'class-validator'
import { AppModule } from './core/app.module'
import { CustomLogger } from './shared/utils/custom-logger'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.useLogger(new CustomLogger())

	app.enableCors({ credentials: true })

	useContainer(app.select(AppModule), { fallbackOnErrors: true })

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true
		})
	)

	await app.listen(process.env.PORT ?? 7777)
}
bootstrap()
