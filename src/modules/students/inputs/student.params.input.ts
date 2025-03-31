import { BaseParamsWithPaginationInput } from '@/shared/base/base-params.input'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class StudentParamsInput extends BaseParamsWithPaginationInput {
	@Field(() => String, { nullable: true })
	lastName?: string

	@Field(() => String, { nullable: true })
	departmentTitle?: string

	@Field(() => String, { nullable: true })
	courseNumber?: string

	@Field(() => String, { nullable: true })
	groupTitle?: string

	@Field(() => String, { nullable: true })
	groupId?: string

	@Field(() => Boolean, { nullable: true, defaultValue: false })
	isExpelled?: boolean
}
