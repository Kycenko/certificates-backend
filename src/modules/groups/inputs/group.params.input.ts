import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GroupParamsInput {
	@Field(() => String, { nullable: true })
	title?: string

	@Field(() => String, { nullable: true })
	departmentTitle?: string

	@Field(() => Number, { nullable: true })
	courseNumber?: number

	@Field(() => String, { defaultValue: 'asc' })
	orderBy: 'asc' | 'desc'
}
