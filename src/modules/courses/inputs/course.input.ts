import { Field, InputType } from '@nestjs/graphql'
import { Max, Min } from 'class-validator'

@InputType()
export class CourseInput {
	@Field(() => String)
	@Min(1, { message: 'Course number must be at least 1' })
	@Max(4, { message: 'Course number must be at most 4' })
	number: string

	@Field(() => String)
	departmentId: string
}
