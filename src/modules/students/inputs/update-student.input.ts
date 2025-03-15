import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, MinLength } from 'class-validator'

@InputType()
export class UpdateStudentInput {
	@Field(() => String, { nullable: true })
	@MinLength(3)
	@IsOptional()
	firstName?: string
	@Field(() => String, { nullable: true })
	@MinLength(3)
	@IsOptional()
	lastName?: string
	@Field(() => String, { nullable: true })
	@MinLength(6)
	@IsOptional()
	secondName?: string
	@Field(() => Date, { nullable: true })
	birthDate?: Date
	@Field(() => String, { nullable: true })
	groupId?: string
	@Field(() => Boolean, { defaultValue: false, nullable: true })
	isExpelled?: boolean
}
