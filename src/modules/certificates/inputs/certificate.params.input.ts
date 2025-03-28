import { BaseParamsWithPaginationInput } from '@/shared/base/base-params.input'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CertificateParamsInput extends BaseParamsWithPaginationInput {
	@Field(() => String, { nullable: true })
	studentLastName?: string

	@Field(() => String, { nullable: true })
	departmentTitle?: string

	@Field(() => Number, { nullable: true })
	courseNumber?: number

	@Field(() => String, { nullable: true })
	groupTitle?: string

	@Field(() => Date, { nullable: true })
	startDate?: Date

	@Field(() => Date, { nullable: true })
	finishDate?: Date
}
