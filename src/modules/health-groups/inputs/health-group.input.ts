import { Field, InputType } from '@nestjs/graphql'
import { MaxLength, MinLength } from 'class-validator'

@InputType()
export class HealthGroupInput {
	@Field(() => String)
	@MinLength(3, {
		message: 'Title must be at least 3 characters long'
	})
	@MaxLength(10, {
		message: 'Title must be at most 10 characters long'
	})
	title: string
}
