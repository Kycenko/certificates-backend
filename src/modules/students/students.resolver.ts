import { RemoveManyInput } from '@/shared/base/remove-many.input'
import { AuthRole } from '@/shared/decorators/role.decorator'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { StudentInput } from './inputs/student.input'
import { StudentParamsInput } from './inputs/student.params.input'
import { UpdateStudentInput } from './inputs/update-student.input'
import { StudentModel } from './models/student.model'
import { StudentsService } from './students.service'

@Resolver()
export class StudentsResolver {
	constructor(private readonly studentsService: StudentsService) {}

	@Mutation(() => StudentModel, { name: 'createStudent' })
	@AuthRole('ADMIN')
	async create(@Args('data') data: StudentInput) {
		return this.studentsService.create(data)
	}

	@Query(() => [StudentModel], { name: 'getAllStudents' })
	async getAll(
		@Args('params', { nullable: true }) params?: StudentParamsInput
	) {
		return this.studentsService.getAll({ params })
	}

	@Query(() => StudentModel, { name: 'getStudentById' })
	async getById(@Args('id') id: string) {
		return this.studentsService.getById(id)
	}

	@Mutation(() => StudentModel, { name: 'updateStudent' })
	@AuthRole('ADMIN')
	async update(@Args('id') id: string, @Args('data') data: UpdateStudentInput) {
		return this.studentsService.update(id, data)
	}

	@Mutation(() => Boolean, { name: 'removeStudent' })
	@AuthRole('ADMIN')
	async remove(@Args('id') id: string) {
		return this.studentsService.remove(id)
	}

	@Mutation(() => Boolean, { name: 'removeManyStudents' })
	@AuthRole('ADMIN')
	async removeMany(@Args() params: RemoveManyInput) {
		return this.studentsService.removeMany(params.ids)
	}

	@Mutation(() => Boolean, { name: 'removeAllStudents' })
	@AuthRole('ADMIN')
	async removeAll() {
		return this.studentsService.removeAll()
	}
}
