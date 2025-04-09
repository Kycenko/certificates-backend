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
	@AuthRole('ADMIN')
	async create(@Args('data') data: StudentHistoryInput) {
		return this.studentHistoriesService.create(data)
	}

	@Query(() => [StudentHistoryModel], { name: 'getAllStudentHistories' })
	@AuthRole('ADMIN')
	async getAll(@Args('studentId') studentId: string) {
		return this.studentHistoriesService.getAll(studentId)
	}

	@Mutation(() => Boolean, { name: 'removeAllStudentHistory' })
	@AuthRole('ADMIN')
	async removeAll(@Args('studentId') studentId: string) {
		return this.studentHistoriesService.removeAll(studentId)
	}
}
