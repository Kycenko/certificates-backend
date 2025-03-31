import { Field, InputType } from '@nestjs/graphql'
import { Max, Min } from 'class-validator'

@InputType()
export class UpdateCourseInput {
	@Field(() => String, { nullable: true })
	@Min(1, { message: 'Course number must be at least 1' })
	@Max(4, { message: 'Course number must be at most 4' })
	number?: string

	@Field(() => String, { nullable: true })
	departmentId?: string
}
