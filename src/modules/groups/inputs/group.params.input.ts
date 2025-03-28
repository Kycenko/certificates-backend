import { BaseParamsInput } from '@/shared/base/base-params.input'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GroupParamsInput extends BaseParamsInput {
	@Field(() => String, { nullable: true })
	title?: string

	@Field(() => String, { nullable: true })
	departmentTitle?: string

	@Field(() => Number, { nullable: true })
	courseNumber?: number
}
