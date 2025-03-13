import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class HealthGroupParamsInput {
	@Field(() => String, { nullable: true })
	title?: string

	@Field(() => String, { defaultValue: 'asc' })
	orderBy: 'asc' | 'desc'
}
