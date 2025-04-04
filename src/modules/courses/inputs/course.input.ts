import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CourseInput {
	@Field(() => String)
	number: string

	@Field(() => String)
	departmentId: string
}
