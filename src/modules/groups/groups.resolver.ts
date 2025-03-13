import { AuthRole } from '@/shared/decorators/role.decorator'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GroupsService } from './groups.service'
import { GroupInput } from './inputs/group.input'
import { GroupParamsInput } from './inputs/group.params.input'
import { GroupModel } from './models/group.model'

@Resolver()
export class GroupsResolver {
	constructor(private readonly groupsService: GroupsService) {}

	@Mutation(() => GroupModel, { name: 'createGroup' })
	@AuthRole('admin')
	async create(@Args('data') data: GroupInput) {
		return this.groupsService.create(data)
	}

	@Query(() => [GroupModel], { name: 'getAllGroups' })
	@AuthRole('admin')
	async getAll(@Args('params') params: GroupParamsInput) {
		return this.groupsService.getAll({ params })
	}

	@Query(() => GroupModel, { name: 'getGroupById' })
	@AuthRole('admin')
	async getById(@Args('id') id: string) {
		return this.groupsService.getById(id)
	}

	@Query(() => GroupModel, { name: 'getGroupByTitle' })
	@AuthRole('admin')
	async getByTitle(@Args('title') title: string) {
		return this.groupsService.getByTitle(title)
	}

	@Mutation(() => GroupModel, { name: 'updateGroup' })
	@AuthRole('admin')
	async update(@Args('id') id: string, @Args('data') data: GroupInput) {
		return this.groupsService.update(id, data)
	}

	@Mutation(() => Boolean, { name: 'removeGroup' })
	@AuthRole('admin')
	async remove(@Args('id') id: string) {
		return this.groupsService.remove(id)
	}
}
