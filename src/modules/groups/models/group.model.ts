import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class GroupModel {
	@Field(() => String)
	title: string

	@Field(() => String, { nullable: true })
	courseId?: string
}
