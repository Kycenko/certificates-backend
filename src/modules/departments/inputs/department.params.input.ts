import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DepartmentParamsInput {
	@Field(() => String, { nullable: true })
	title?: string

	@Field(() => String, { defaultValue: 'asc' })
	orderBy: 'asc' | 'desc'
}
