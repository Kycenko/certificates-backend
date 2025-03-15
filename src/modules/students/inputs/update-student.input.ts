import { Field, InputType } from '@nestjs/graphql'
import { MinLength } from 'class-validator'

@InputType()
export class UpdateStudentInput {
	@Field(() => String, { nullable: true })
	@MinLength(6)
	firstName?: string
	@Field(() => String, { nullable: true })
	@MinLength(3)
	lastName?: string
	@Field(() => String, { nullable: true })
	@MinLength(6)
	secondName?: string
	@Field(() => Date, { nullable: true })
	birthDate?: Date
	@Field(() => String, { nullable: true })
	groupId?: string
	@Field(() => Boolean, { defaultValue: false, nullable: true })
	isExpelled?: boolean
}
