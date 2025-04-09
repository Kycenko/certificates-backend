import { RemoveManyInput } from '@/shared/base/remove-many.input'
import { AuthRole } from '@/shared/decorators/role.decorator'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { HealthGroupsService } from './health-groups.service'
import { HealthGroupInput } from './inputs/health-group.input'

import { HealthGroupParamsInput } from './inputs/health-group.params.input'
import { HealthGroupModel } from './models/health-group.model'

@Resolver()
export class HealthGroupsResolver {
	constructor(private readonly healthGroupsService: HealthGroupsService) {}
	@Mutation(() => HealthGroupModel, { name: 'createHealthGroup' })
	@AuthRole('ADMIN')
	async create(@Args('data') data: HealthGroupInput) {
		return this.healthGroupsService.create(data)
	}

	@Query(() => [HealthGroupModel], { name: 'getAllHealthGroups' })
	@AuthRole('ADMIN')
	async getAll(
		@Args('params', { nullable: true }) params?: HealthGroupParamsInput
	) {
		return this.healthGroupsService.getAll({ params })
	}

	@Query(() => HealthGroupModel, { name: 'getHealthGroupById' })
	@AuthRole('ADMIN')
	async getById(@Args('id') id: string) {
		return this.healthGroupsService.getById(id)
	}

	@Query(() => HealthGroupModel, { name: 'getHealthGroupByTitle' })
	@AuthRole('ADMIN')
	async getByTitle(@Args('title') title: string) {
		return this.healthGroupsService.getByTitle(title)
	}

	@Mutation(() => HealthGroupModel, { name: 'updateHealthGroup' })
	@AuthRole('ADMIN')
	async update(@Args('id') id: string, @Args('data') data: HealthGroupInput) {
		return this.healthGroupsService.update(id, data)
	}

	@Mutation(() => Boolean, { name: 'removeHealthGroup' })
	@AuthRole('ADMIN')
	async remove(@Args('id') id: string) {
		return this.healthGroupsService.remove(id)
	}

	@Mutation(() => Boolean, { name: 'removeManyHealthGroups' })
	@AuthRole('ADMIN')
	async removeMany(@Args() params: RemoveManyInput) {
		return this.healthGroupsService.removeMany(params.ids)
	}

	@Mutation(() => HealthGroupModel, { name: 'removeAllHealthGroup' })
	@AuthRole('ADMIN')
	async removeAll() {
		return this.healthGroupsService.removeAll()
	}
}
