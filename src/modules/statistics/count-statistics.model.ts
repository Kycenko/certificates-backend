import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class CountStatisticsModel {
	@Field(() => Number)
	departments: number

	@Field(() => Number)
	courses: number

	@Field(() => Number)
	groups: number

	@Field(() => Number)
	curators: number

	@Field(() => Number)
	students: number
}
