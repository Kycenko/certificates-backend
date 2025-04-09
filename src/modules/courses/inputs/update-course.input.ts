import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateCourseInput {
	@Field(() => String, { nullable: true })
	number?: string

	@Field(() => String, { nullable: true })
	departmentId?: string
}
