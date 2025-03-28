import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class BaseParamsInput {
	@Field(() => String, { defaultValue: 'asc' })
	orderBy?: 'asc' | 'desc'
}
