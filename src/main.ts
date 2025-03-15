import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './core/app.module'
import { CustomLogger } from './shared/utils/custom-logger'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.useLogger(new CustomLogger())

	app.enableCors({ credentials: true })

	app.useGlobalPipes(new ValidationPipe({ transform: true }))

	await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
