import { AuthRole } from '@/shared/decorators/role.decorator'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { HealthGroupsService } from './health-groups.service'
import { HealthGroupInput } from './inputs/health-group.module'
import { HealthGroupParamsInput } from './inputs/health-group.params.input'
import { HealthGroupModel } from './models/health-group.model'

@Resolver()
export class HealthGroupsResolver {
	constructor(private readonly healthGroupsService: HealthGroupsService) {}
	@Mutation(() => HealthGroupModel, { name: 'createHealthGroup' })
	@AuthRole('admin')
	async create(@Args('data') data: HealthGroupInput) {
		return this.healthGroupsService.create(data)
	}

	@Query(() => [HealthGroupModel], { name: 'getAllHealthGroups' })
	@AuthRole('admin')
	async getAll(@Args('params') params: HealthGroupParamsInput) {
		return this.healthGroupsService.getAll({ params })
	}

	@Query(() => HealthGroupModel, { name: 'getHealthGroupById' })
	@AuthRole('admin')
	async getById(@Args('id') id: string) {
		return this.healthGroupsService.getById(id)
	}

	@Query(() => HealthGroupModel, { name: 'getHealthGroupByTitle' })
	@AuthRole('admin')
	async getByTitle(@Args('title') title: string) {
		return this.healthGroupsService.getByTitle(title)
	}

	@Mutation(() => HealthGroupModel, { name: 'updateHealthGroup' })
	@AuthRole('admin')
	async update(@Args('id') id: string, @Args('data') data: HealthGroupInput) {
		return this.healthGroupsService.update(id, data)
	}

	@Mutation(() => Boolean, { name: 'removeHealthGroup' })
	@AuthRole('admin')
	async remove(@Args('id') id: string) {
		return this.healthGroupsService.remove(id)
	}
}
