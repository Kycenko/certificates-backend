import { AuthRole } from '@/shared/decorators/role.decorator'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PhysicalEducationInput } from './inputs/physical-education.input'
import { PhysicalEducationParamsInput } from './inputs/physical-education.params.input'
import { PhysicalEducationModel } from './models/physical-education.model'
import { PhysicalEducationsService } from './physical-educations.service'

@Resolver()
export class PhysicalEducationsResolver {
	constructor(
		private readonly physicalEducationsService: PhysicalEducationsService
	) {}

	@Mutation(() => PhysicalEducationModel, { name: 'createPhysicalEducation' })
	@AuthRole('admin')
	async create(@Args('data') data: PhysicalEducationInput) {
		return this.physicalEducationsService.create(data)
	}

	@Query(() => [PhysicalEducationModel], { name: 'getAllPhysicalEducations' })
	@AuthRole('admin')
	async getAll(@Args('params') params: PhysicalEducationParamsInput) {
		return this.physicalEducationsService.getAll({ params })
	}

	@Query(() => PhysicalEducationModel, { name: 'getPhysicalEducationById' })
	@AuthRole('admin')
	async getById(@Args('id') id: string) {
		return this.physicalEducationsService.getById(id)
	}

	@Query(() => PhysicalEducationModel, { name: 'getPhysicalEducationByTitle' })
	@AuthRole('admin')
	async getByTitle(@Args('title') title: string) {
		return this.physicalEducationsService.getByTitle(title)
	}

	@Mutation(() => PhysicalEducationModel, { name: 'updatePhysicalEducation' })
	@AuthRole('admin')
	async update(
		@Args('id') id: string,
		@Args('data') data: PhysicalEducationInput
	) {
		return this.physicalEducationsService.update(id, data)
	}

	@Mutation(() => Boolean, { name: 'removePhysicalEducation' })
	@AuthRole('admin')
	async remove(@Args('id') id: string) {
		return this.physicalEducationsService.remove(id)
	}
}
