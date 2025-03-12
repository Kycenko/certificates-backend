import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class DepartmentModel {
	@Field(() => String)
	title: string
}
