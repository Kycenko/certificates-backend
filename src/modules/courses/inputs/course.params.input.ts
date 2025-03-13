import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CourseParamsInput {
	@Field(() => String, { nullable: true })
	title?: string

	@Field(() => String, { defaultValue: 'asc' })
	orderBy: 'asc' | 'desc'
}
