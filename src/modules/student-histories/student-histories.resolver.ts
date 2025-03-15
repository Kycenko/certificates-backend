import { AuthRole } from '@/shared/decorators/role.decorator'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { StudentHistoryInput } from './inputs/student-history.input'
import { StudentHistoryModel } from './models/student-history.model'
import { StudentHistoriesService } from './student-histories.service'

@Resolver()
export class StudentHistoriesResolver {
	constructor(
		private readonly studentHistoriesService: StudentHistoriesService
	) {}

	@Mutation(() => StudentHistoryModel, { name: 'createStudentHistory' })
	@AuthRole('admin')
	async create(@Args('data') data: StudentHistoryInput) {
		return this.studentHistoriesService.create(data)
	}

	@Query(() => [StudentHistoryModel], { name: 'getAllStudentHistories' })
	@AuthRole('admin')
	async getAll(@Args('studentId') studentId: string) {
		return this.studentHistoriesService.getAll(studentId)
	}
}
