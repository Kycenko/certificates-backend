import { Field, InputType } from '@nestjs/graphql'
import { MaxLength, MinLength } from 'class-validator'

@InputType()
export class LoginInput {
	@Field(() => String)
	@MinLength(6)
	@MaxLength(20)
	login: string

	@Field(() => String)
	@MinLength(6)
	@MaxLength(20)
	password: string
}
