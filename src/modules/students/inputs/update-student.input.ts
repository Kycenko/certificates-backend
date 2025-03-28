import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, MaxLength, MinLength } from 'class-validator'

@InputType()
export class UpdateStudentInput {
	@Field(() => String, { nullable: true })
	@MinLength(4, {
		message: 'First name must be at least 4 characters long'
	})
	@MaxLength(20, {
		message: 'Last name must be at most 20 characters long'
	})
	@IsOptional()
	firstName?: string
	@Field(() => String, { nullable: true })
	@MinLength(3, {
		message: 'First name must be at least 3 characters long'
	})
	@MaxLength(20, {
		message: 'Last name must be at most 20 characters long'
	})
	@IsOptional()
	lastName?: string
	@Field(() => String, { nullable: true })
	@MinLength(3, {
		message: 'First name must be at least 3 characters long'
	})
	@MaxLength(20, {
		message: 'Last name must be at most 20 characters long'
	})
	@IsOptional()
	secondName?: string
	@Field(() => Date, { nullable: true })
	birthDate?: Date
	@Field(() => String, { nullable: true })
	groupId?: string
	@Field(() => Boolean, { defaultValue: false, nullable: true })
	isExpelled?: boolean
}
