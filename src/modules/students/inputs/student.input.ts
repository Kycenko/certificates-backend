import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, MinLength } from 'class-validator'

@InputType()
export class StudentInput {
	@Field(() => String)
	@MinLength(4)
	firstName: string
	@Field(() => String)
	@MinLength(3)
	lastName: string
	@Field(() => String, { nullable: true })
	@MinLength(6)
	@IsOptional()
	secondName?: string
	@Field(() => Date)
	birthDate: Date
	@Field(() => String, { nullable: true })
	@IsOptional()
	groupId?: string
	@Field(() => Boolean, { defaultValue: false })
	isExpelled: boolean
}
