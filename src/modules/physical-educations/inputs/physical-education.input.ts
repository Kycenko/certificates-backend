import { Field, InputType } from '@nestjs/graphql'
import { MaxLength, MinLength } from 'class-validator'

@InputType()
export class PhysicalEducationInput {
	@Field(() => String)
	@MinLength(3, {
		message: 'Title must be at least 3 characters long'
	})
	@MaxLength(20, {
		message: 'Title must be at most 20 characters long'
	})
	title: string
}
