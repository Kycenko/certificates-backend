import { CurrentUser } from '@/common/decorators/user.decorator'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from '../auth/models/user.model'
import { UpdateUserInput } from './dto/update-user.input'
import { UsersService } from './users.service'

@Resolver()
export class UsersResolver {
	constructor(private readonly usersService: UsersService) {}

	@Query(() => User)
	async me(@CurrentUser() user: User) {
		return user
	}

	@Mutation(() => User)
	async updateUser(
		@Args('id') id: string,
		@Args('data') data: UpdateUserInput
	) {
		return this.usersService.updateUser(id, data)
	}
}
