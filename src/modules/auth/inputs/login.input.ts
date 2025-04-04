import { Field, InputType } from '@nestjs/graphql'
import { Matches, MaxLength, MinLength } from 'class-validator'

@InputType()
export class LoginInput {
	@Field(() => String)
	@MinLength(5, { message: 'Login must be at least 5 characters long' })
	@MaxLength(20, { message: 'Login must be at most 20 characters long' })
	login: string

	@Field(() => String)
	@MinLength(8, { message: 'Password must be at least 8 characters long' })
	@MaxLength(64, { message: 'Password must be at most 64 characters long' })
	@Matches(/[A-Z]/, {
		message: 'Password must contain at least one uppercase letter'
	})
	@Matches(/[a-z]/, {
		message: 'Password must contain at least one lowercase letter'
	})
	@Matches(/[0-9]/, {
		message: 'Password must contain at least one digit'
	})
	@Matches(/[^A-Za-z0-9]/, {
		message: 'Password must contain at least one special character'
	})
	password: string
}
