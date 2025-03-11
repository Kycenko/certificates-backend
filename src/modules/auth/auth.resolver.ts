import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { LoginInput } from './dto/login.input'
import { RegisterInput } from './dto/register.input'
import { AuthPayload } from './models/auth.payload'

@Resolver()
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Mutation(() => AuthPayload)
	async login(@Args('loginInput') loginInput: LoginInput) {
		return this.authService.login(loginInput)
	}

	@Mutation(() => AuthPayload)
	async register(@Args('registerInput') registerInput: RegisterInput) {
		return this.authService.register(registerInput)
	}

	@Mutation(() => String)
	async logout(@Args('id') id: string) {
		return this.authService.logout(id)
	}

	@Mutation(() => AuthPayload)
	async getNewTokens(
		@Args('userId') userId: string,
		@Args('refreshToken') refreshToken: string
	) {
		return this.authService.getNewTokens(userId, refreshToken)
	}
}
