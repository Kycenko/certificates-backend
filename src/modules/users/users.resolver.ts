import { CurrentUser } from '@/common/decorators/user.decorator'

import { GqlAuthGuard } from '@/common/guards/gql-auth.guard'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UpdateUserInput } from './inputs/update-user.input'
import { UserModel } from './models/user.model'
import { UsersService } from './users.service'

@Resolver()
export class UsersResolver {
	constructor(private readonly usersService: UsersService) {}

	@Query(() => UserModel, { name: 'getProfile' })
	@UseGuards(GqlAuthGuard)
	async me(@CurrentUser() user: UserModel) {
		return user
	}

	@Query(() => UserModel, { name: 'getUserByLogin' })
	async getByLogin(@Args('login') login: string) {
		return this.usersService.getByLogin(login)
	}

	@Mutation(() => UserModel)
	async changePassword(
		@Args('id') id: string,
		@Args('oldPassword') oldPassword: string,
		@Args('newPassword') newPassword: string
	) {
		return this.usersService.changePassword(id, oldPassword, newPassword)
	}

	@Mutation(() => UserModel, { name: 'updateUser' })
	async update(@Args('id') id: string, @Args('data') data: UpdateUserInput) {
		return this.usersService.update(id, data)
	}
}
