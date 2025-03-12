import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserModel {
	@Field(() => ID)
	id: string

	@Field(() => String)
	login: string

	@Field(() => Boolean)
	isAdmin: boolean
}
