import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CertificateParamsInput {
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

	@Field(() => String, { defaultValue: 'asc' })
	orderBy: 'asc' | 'desc'

	@Field(() => Number, { defaultValue: 1 })
	page: number

	@Field(() => Number, { defaultValue: 25 })
	limit: number
}
