import { CurrentUser } from '@/shared/decorators/user.decorator'
import { GqlAuthGuard } from '@/shared/guards/gql-auth.guard'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UpdateUserInput } from './inputs/update-user.input'
import { UserModel } from './models/user.model'
import { UsersService } from './users.service'

@Resolver()
export class UsersResolver {
	constructor(private readonly usersService: UsersService) {}

	@Mutation(() => UserModel, { name: 'updateUser' })
	async update(
		@Args('id') id: string,
		@Args('updateDto') data: UpdateUserInput
	) {
		return this.usersService.update(id, data)
	}

	@Query(() => UserModel, { name: 'getProfile' })
	@UseGuards(GqlAuthGuard)
	async me(@CurrentUser() user: UserModel) {
		return user
	}

	@Query(() => UserModel, { name: 'getUserByLogin' })
	async getByLogin(@Args('login') login: string) {
		return this.usersService.getByLogin(login)
	}

	@Mutation(() => Boolean, { name: 'removeUser' })
	async remove(@Args('id') id: string) {
		return this.usersService.remove(id)
	}
}
