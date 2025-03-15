import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class StudentParamsInput {
	@Field(() => String, { nullable: true })
	lastName?: string

	@Field(() => String, { nullable: true })
	departmentTitle?: string

	@Field(() => Number, { nullable: true })
	courseNumber?: number

	@Field(() => String, { nullable: true })
	groupTitle?: string

	@Field(() => String, { nullable: true })
	groupId?: string

	@Field(() => Boolean, { nullable: true, defaultValue: false })
	isExpelled?: boolean

	@Field(() => String, { defaultValue: 'asc' })
	orderBy: 'asc' | 'desc'

	@Field(() => Number, { defaultValue: 1 })
	page: number

	@Field(() => Number, { defaultValue: 25 })
	limit: number
}
