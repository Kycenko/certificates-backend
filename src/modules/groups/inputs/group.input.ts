import { Field, InputType } from '@nestjs/graphql'
import { MaxLength, MinLength } from 'class-validator'

@InputType()
export class GroupInput {
	@Field(() => String)
	@MinLength(3, {
		message: 'Title must be at least 3 characters long'
	})
	@MaxLength(5, {
		message: 'Title must be at most 5 characters long'
	})
	title: string

	@Field(() => String, { nullable: true })
	courseId?: string
}
