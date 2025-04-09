import { RemoveManyInput } from '@/shared/base/remove-many.input'
import { AuthRole } from '@/shared/decorators/role.decorator'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { DepartmentsService } from './departments.service'
import { DepartmentInput } from './inputs/department.input'
import { DepartmentParamsInput } from './inputs/department.params.input'
import { DepartmentModel } from './models/department.model'

@Resolver()
export class DepartmentsResolver {
	constructor(private readonly departmentsService: DepartmentsService) {}

	@Mutation(() => DepartmentModel, { name: 'createDepartment' })
	@AuthRole('ADMIN')
	async create(@Args('data') data: DepartmentInput) {
		return this.departmentsService.create(data)
	}

	@Query(() => [DepartmentModel], { name: 'getAllDepartments' })
	@AuthRole('ADMIN')
	async getAll(
		@Args('params', { nullable: true }) params?: DepartmentParamsInput
	) {
		return this.departmentsService.getAll({ params })
	}

	@Query(() => DepartmentModel, { name: 'getDepartmentById' })
	@AuthRole('ADMIN')
	async getById(@Args('id') id: string) {
		return this.departmentsService.getById(id)
	}

	@Query(() => DepartmentModel, { name: 'getDepartmentByTitle' })
	@AuthRole('ADMIN')
	async getByTitle(@Args('title') title: string) {
		return this.departmentsService.getByTitle(title)
	}

	@Mutation(() => DepartmentModel, { name: 'updateDepartment' })
	@AuthRole('ADMIN')
	async update(@Args('id') id: string, @Args('data') data: DepartmentInput) {
		return this.departmentsService.update(id, data)
	}

	@Mutation(() => Boolean, { name: 'removeDepartment' })
	@AuthRole('ADMIN')
	async remove(@Args('id') id: string) {
		return this.departmentsService.remove(id)
	}

	@Mutation(() => Boolean, { name: 'removeManyDepartments' })
	@AuthRole('ADMIN')
	async removeMany(@Args() params: RemoveManyInput) {
		return this.departmentsService.removeMany(params.ids)
	}

	@Mutation(() => Boolean, { name: 'removeAllDepartments' })
	@AuthRole('ADMIN')
	async removeAll() {
		return this.departmentsService.removeAll()
	}
}
