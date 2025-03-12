import { RedisModule } from '@/core/redis/redis.module'
import { Module } from '@nestjs/common'
import { DepartmentsResolver } from './departments.resolver'
import { DepartmentsService } from './departments.service'

@Module({
	imports: [RedisModule],
	providers: [DepartmentsResolver, DepartmentsService]
})
export class DepartmentsModule {}
