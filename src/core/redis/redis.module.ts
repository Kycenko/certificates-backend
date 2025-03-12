import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Redis } from 'ioredis'
import { RedisService } from './redis.service'

@Global()
@Module({
	imports: [ConfigModule],
	providers: [
		{
			provide: 'REDIS_CLIENT',
			useFactory: async (configService: ConfigService) => {
				return new Redis({
					host: configService.getOrThrow<string>('REDIS_HOST'),
					port: configService.getOrThrow<number>('REDIS_PORT'),
					password: configService.getOrThrow<string>('REDIS_PASSWORD')
				})
			},
			inject: [ConfigService]
		},
		RedisService
	],
	exports: ['REDIS_CLIENT', RedisService]
})
export class RedisModule {}
