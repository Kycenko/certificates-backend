import { Inject, Injectable } from '@nestjs/common'
import { Redis } from 'ioredis'

@Injectable()
export class RedisService {
	constructor(
		@Inject('REDIS_CLIENT')
		private readonly redisClient: Redis
	) {}

	async set(key: string, value: string, ttl?: number): Promise<void> {
		if (ttl) {
			await this.redisClient.set(key, value, 'EX', ttl)
		} else {
			await this.redisClient.set(key, value)
		}
	}

	async get(key: string): Promise<string | null> {
		return this.redisClient.get(key)
	}

	async del(key: string): Promise<number> {
		return this.redisClient.del(key)
	}

	async exists(key: string): Promise<number> {
		return this.redisClient.exists(key)
	}

	async expire(key: string, ttl: number): Promise<number> {
		return this.redisClient.expire(key, ttl)
	}
}
