import { CurrentUser } from '@/common/decorators/user.decorator'

import { GqlAuthGuard } from '@/common/decorators/gql-auth.guard'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UpdateUserInput } from './inputs/update-user.input'
import { User } from './models/user.model'
import { UsersService } from './users.service'

@Resolver()
export class UsersResolver {
	constructor(private readonly usersService: UsersService) {}

	@Query(() => User)
	@UseGuards(GqlAuthGuard)
	async me(@CurrentUser() user: User) {
		return user
	}

	@Query(() => User)
	async getUserByLogin(@Args('login') login: string) {
		return this.usersService.getUserByLogin(login)
	}

	@Mutation(() => User)
	async changePassword(
		@Args('id') id: string,
		@Args('oldPassword') oldPassword: string,
		@Args('newPassword') newPassword: string
	) {
		return this.usersService.changePassword(id, oldPassword, newPassword)
	}

	@Mutation(() => User)
	async updateUser(
		@Args('id') id: string,
		@Args('data') data: UpdateUserInput
	) {
		return this.usersService.updateUser(id, data)
	}
}
