import { BaseOrderParamsInput } from '@/shared/base/base-params.input'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class PhysicalEducationParamsInput extends BaseOrderParamsInput {
	@Field(() => String, { nullable: true })
	title?: string
}
