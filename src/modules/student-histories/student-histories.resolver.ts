import { Resolver } from '@nestjs/graphql'
import { StudentHistoriesService } from './student-histories.service'

@Resolver()
export class StudentHistoriesResolver {
	constructor(
		private readonly studentHistoriesService: StudentHistoriesService
	) {}
}
