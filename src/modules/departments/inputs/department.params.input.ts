import { BaseParamsInput } from '@/shared/base/base-params.input'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DepartmentParamsInput extends BaseParamsInput {
	@Field(() => String, { nullable: true })
	title?: string
}
