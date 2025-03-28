import { BirthDateValidator } from '@/shared/validators/birth-date.validator'
import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, MaxLength, MinLength, Validate } from 'class-validator'

@InputType()
export class StudentInput {
	@Field(() => String)
	@MinLength(4, {
		message: 'First name must be at least 4 characters long'
	})
	@MaxLength(20, {
		message: 'Last name must be at most 20 characters long'
	})
	firstName: string
	@Field(() => String)
	@MinLength(3, {
		message: 'Last name must be at least 3 characters long'
	})
	@MaxLength(20, {
		message: 'Last name must be at most 20 characters long'
	})
	lastName: string
	@Field(() => String, { nullable: true })
	@MinLength(3, {
		message: 'Last name must be at least 3 characters long'
	})
	@MaxLength(20, {
		message: 'Last name must be at most 20 characters long'
	})
	@IsOptional()
	secondName?: string
	@Field(() => Date)
	@Validate(BirthDateValidator)
	birthDate: Date
	@Field(() => String, { nullable: true })
	@IsOptional()
	groupId?: string
	@Field(() => Boolean, { defaultValue: false })
	isExpelled: boolean
}
