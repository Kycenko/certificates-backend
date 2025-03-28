import { Field, InputType } from '@nestjs/graphql'
import { MaxLength, MinLength } from 'class-validator'

@InputType()
export class DepartmentInput {
	@Field(() => String)
	@MinLength(3, {
		message: 'Title must be at least 3 characters long'
	})
	@MaxLength(50, {
		message: 'Title must be at most 50 characters long'
	})
	title: string
}
