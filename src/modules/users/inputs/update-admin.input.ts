import { Field, InputType } from '@nestjs/graphql'
import { IsEnum, IsOptional, MaxLength, MinLength } from 'class-validator'

@InputType()
export class UpdateAdminInput {
	@Field(() => String, { nullable: true })
	@IsOptional()
	@MinLength(6, {
		message: 'Login must be at least 6 characters long'
	})
	@MaxLength(20, {
		message: 'Login must be at most 20 characters long'
	})
	login?: string

	@Field(() => String, { nullable: true })
	@IsOptional()
	@MinLength(6, {
		message: 'Password must be at least 6 characters long'
	})
	@MaxLength(20, {
		message: 'Password must be at most 20 characters long'
	})
	password?: string

	@Field(() => String, { defaultValue: 'ADMIN' })
	@IsEnum(['ADMIN'])
	role: string
}
