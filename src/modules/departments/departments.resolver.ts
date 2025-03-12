import { AuthRole } from '@/common/decorators/role.decorator'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { DepartmentsService } from './departments.service'
import { DepartmentInput } from './inputs/department.input'
import { DepartmentModel } from './models/department.model'

@Resolver()
export class DepartmentsResolver {
	constructor(private readonly departmentsService: DepartmentsService) {}

	@Mutation(() => Boolean, { name: 'createDepartment' })
	@AuthRole('admin')
	async create(@Args('data') data: DepartmentInput) {
		return this.departmentsService.create(data)
	}

	@Query(() => [DepartmentModel], { name: 'getAllDepartments' })
	@AuthRole('admin')
	async getAll(
		@Args('title', { nullable: true }) title?: string,
		@Args('orderBy') orderBy: 'asc' | 'desc' = 'asc'
	) {
		return this.departmentsService.getAll(title, orderBy)
	}

	@Query(() => DepartmentModel, { name: 'getDepartmentById' })
	@AuthRole('admin')
	async getById(@Args('id') id: string) {
		return this.departmentsService.getById(id)
	}

	@Query(() => DepartmentModel, { name: 'getDepartmentByTitle' })
	@AuthRole('admin')
	async getByTitle(@Args('title') title: string) {
		return this.departmentsService.getByTitle(title)
	}

	@Mutation(() => DepartmentModel, { name: 'updateDepartment' })
	@AuthRole('admin')
	async update(@Args('id') id: string, @Args('data') data: DepartmentInput) {
		return this.departmentsService.update(id, data)
	}

	@Mutation(() => Boolean, { name: 'removeDepartment' })
	@AuthRole('admin')
	async remove(@Args('id') id: string) {
		return this.departmentsService.remove(id)
	}
}
