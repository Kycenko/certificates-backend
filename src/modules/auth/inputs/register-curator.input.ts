import { Field, InputType } from '@nestjs/graphql'
import { IsEnum, MaxLength, MinLength } from 'class-validator'

@InputType()
export class RegisterCuratorInput {
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

	@Field(() => String, { defaultValue: 'TEACHER' })
	@IsEnum(['TEACHER'])
	role: string

	@Field(() => String)
	@MinLength(5, {
		message: 'Displayed name must be at least 5 characters long'
	})
	@MaxLength(50, {
		message: 'Displayed name be at most 50 characters long'
	})
	displayedName: string

	@Field(() => String)
	groupId: string
}
