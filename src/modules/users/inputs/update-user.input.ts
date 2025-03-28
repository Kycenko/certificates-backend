import { Field, InputType } from '@nestjs/graphql'
import { IsBoolean, MaxLength, MinLength } from 'class-validator'

@InputType()
export class UpdateUserInput {
	@Field(() => String, { nullable: true })
	@MinLength(6, {
		message: 'Login must be at least 6 characters long'
	})
	@MaxLength(20, {
		message: 'Login must be at most 20 characters long'
	})
	login?: string

	@Field(() => Boolean, { nullable: true })
	@IsBoolean()
	isAdmin?: boolean
}
