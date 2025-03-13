import { GqlAuthGuard } from '@/shared/guards/gql-auth.guard'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { User } from '@prisma/client'

import { CurrentUser } from '@/shared/decorators/user.decorator'
import { AuthService } from './auth.service'
import { LoginInput } from './inputs/login.input'
import { RegisterInput } from './inputs/register.input'
import { AuthModel } from './models/auth.model'

@Resolver()
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Mutation(() => AuthModel)
	async login(@Args('data') data: LoginInput) {
		return this.authService.login(data)
	}

	@Mutation(() => AuthModel)
	async register(@Args('data') data: RegisterInput) {
		return this.authService.register(data)
	}

	@Mutation(() => Boolean)
	@UseGuards(GqlAuthGuard)
	async logout(@CurrentUser() user: User) {
		return this.authService.logout(user.id)
	}

	@Mutation(() => AuthModel)
	async getNewTokens(
		@Args('userId') userId: string,
		@Args('refreshToken') refreshToken: string
	) {
		return this.authService.getNewTokens(userId, refreshToken)
	}
}
