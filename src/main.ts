import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './core/app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.enableCors({ credentials: true })
	app.useGlobalPipes(new ValidationPipe({ transform: true }))

	await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
