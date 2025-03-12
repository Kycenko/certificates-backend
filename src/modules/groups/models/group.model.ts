import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class GroupModel {
	@Field(() => String)
	title: string
}
