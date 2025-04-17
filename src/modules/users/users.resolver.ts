import { RemoveManyInput } from '@/shared/base/remove-many.input'
import { AuthRole } from '@/shared/decorators/role.decorator'
import { CurrentUser } from '@/shared/decorators/user.decorator'
import { GqlAuthGuard } from '@/shared/guards/gql-auth.guard'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UpdateAdminInput } from './inputs/update-admin.input'
import { UpdateCuratorInput } from './inputs/update-curator.input'
import { UserModel } from './models/user.model'
import { UsersService } from './users.service'

@Resolver()
export class UsersResolver {
	constructor(private readonly usersService: UsersService) {}

	@Query(() => [UserModel], { name: 'getAllCurators' })
	@AuthRole('ADMIN')
	async getAllCurators() {
		return this.usersService.getAllCurators()
	}

	@Mutation(() => UserModel, { name: 'updateAdmin' })
	@AuthRole('ADMIN')
	async updateAdmin(
		@Args('id') id: string,
		@Args('updateDto') data: UpdateAdminInput
	) {
		return this.usersService.updateAdmin(id, data)
	}

	@Mutation(() => UserModel, { name: 'updateCurator' })
	@AuthRole('ADMIN')
	async updateCurator(
		@Args('id') id: string,
		@Args('updateDto') data: UpdateCuratorInput
	) {
		return this.usersService.updateCurator(id, data)
	}

	@Mutation(() => UserModel, { name: 'updateCuratorDisplayedName' })
	@AuthRole('ADMIN')
	async updateCuratorDisplayedName(
		@Args('id') id: string,
		@Args('displayedName') displayedName: string
	) {
		return this.usersService.updateCuratorDisplayedName(id, displayedName)
	}

	@Query(() => UserModel, { name: 'getProfile' })
	@AuthRole('ADMIN')
	@UseGuards(GqlAuthGuard)
	async me(@CurrentUser() user: UserModel) {
		return user
	}

	@Query(() => UserModel, { name: 'getUserByLogin' })
	@AuthRole('ADMIN')
	async getByLogin(@Args('login') login: string) {
		return this.usersService.getByLogin(login)
	}

	@Mutation(() => Boolean, { name: 'removeManyCurators' })
	@AuthRole('ADMIN')
	async removeManyCurators(@Args() params: RemoveManyInput) {
		return this.usersService.removeManyCurators(params.ids)
	}

	@Mutation(() => Boolean, { name: 'removeAllCurators' })
	@AuthRole('ADMIN')
	async removeAllCurators() {
		return this.usersService.removeAllCurators()
	}

	@Mutation(() => Boolean, { name: 'removeCurator' })
	@AuthRole('ADMIN')
	async removeCurator(@Args('id') id: string) {
		return this.usersService.removeCurator(id)
	}
}
