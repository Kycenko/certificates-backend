import { Field, InputType } from '@nestjs/graphql'
import { IsBoolean, MaxLength, MinLength } from 'class-validator'

@InputType()
export class RegisterInput {
	@Field(() => String)
	@MinLength(6)
	@MaxLength(20)
	login: string

	@Field(() => String)
	@MinLength(6)
	@MaxLength(20)
	password: string

	@Field(() => Boolean)
	@IsBoolean()
	isAdmin: boolean
}
