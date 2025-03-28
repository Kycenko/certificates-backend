import { BaseOrderParamsInput } from '@/shared/base/base-params.input'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CourseParamsInput extends BaseOrderParamsInput {
	@Field(() => String, { nullable: true })
	departmentTitle?: string
}
