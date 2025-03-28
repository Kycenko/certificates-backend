import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class BaseOrderParamsInput {
	@Field(() => String, { defaultValue: 'asc' })
	orderBy?: 'asc' | 'desc'
}

@InputType()
export class BaseParamsWithPaginationInput extends BaseOrderParamsInput {
	@Field(() => Number, { defaultValue: 1 })
	page: number

	@Field(() => Number, { defaultValue: 10 })
	limit: number
}
