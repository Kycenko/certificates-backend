import { Field, ObjectType } from '@nestjs/graphql'
import { User } from './user.entity'

@ObjectType()
export class AuthPayload {
	@Field(() => String)
	accessToken: string

	@Field(() => String)
	refreshToken: string

	@Field(() => User)
	user: User
}
