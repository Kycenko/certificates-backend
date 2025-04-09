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

	@Mutation(() => UserModel, { name: 'updateCuratorFullName' })
	@AuthRole('ADMIN', 'CURATOR')
	async updateCuratorFullName(
		@Args('id') id: string,
		@Args('fullName') fullName: string
	) {
		return this.usersService.updateCuratorFullName(id, fullName)
	}

	@Query(() => UserModel, { name: 'getProfile' })
	@AuthRole('ADMIN', 'CURATOR')
	@UseGuards(GqlAuthGuard)
	async me(@CurrentUser() user: UserModel) {
		return user
	}

	@Query(() => UserModel, { name: 'getUserByLogin' })
	@AuthRole('ADMIN')
	async getByLogin(@Args('login') login: string) {
		return this.usersService.getByLogin(login)
	}

	@Mutation(() => Boolean, { name: 'removeUser' })
	@AuthRole('ADMIN')
	async remove(@Args('id') id: string) {
		return this.usersService.remove(id)
	}
}
