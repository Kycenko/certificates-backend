import { Field, InputType } from '@nestjs/graphql'
import { Max, Min } from 'class-validator'

@InputType()
export class CourseInput {
	@Field(() => Number)
	@Min(1)
	@Max(4)
	number: number

	@Field(() => String)
	departmentId: string
}
