import { AuthRole } from '@/shared/decorators/role.decorator'
import { Query, Resolver } from '@nestjs/graphql'
import { CountStatisticsModel } from './count-statistics.model'
import { StatisticsService } from './statistics.service'

@Resolver()
export class StatisticsResolver {
	constructor(private readonly statisticsService: StatisticsService) {}

	@Query(() => CountStatisticsModel)
	@AuthRole('ADMIN')
	async getCountStatistics() {
		return this.statisticsService.getCountStatistics()
	}
}
