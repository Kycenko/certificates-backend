import { Field, InputType } from '@nestjs/graphql'
import { IsBoolean, MaxLength, MinLength } from 'class-validator'

@InputType()
export class UpdateUserInput {
	@Field(() => String, { nullable: true })
	@MinLength(6)
	@MaxLength(20)
	login?: string

	@Field(() => String, { nullable: true })
	@MinLength(6)
	@MaxLength(20)
	password?: string

	@Field(() => Boolean, { nullable: true })
	@IsBoolean()
	isAdmin?: boolean
}
