import { Field, InputType } from '@nestjs/graphql'
import { MaxLength, MinLength } from 'class-validator'

@InputType()
export class LoginInput {
	@Field(() => String)
	@MinLength(6, {
		message: 'Login must be at least 6 characters long'
	})
	@MaxLength(20, {
		message: 'Login must be at most 20 characters long'
	})
	login: string

	@Field(() => String)
	@MinLength(6, {
		message: 'Password must be at least 6 characters long'
	})
	@MaxLength(20, {
		message: 'Password must be at most 20 characters long'
	})
	password: string
}
