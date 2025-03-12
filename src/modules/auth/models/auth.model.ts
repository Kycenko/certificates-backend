import { Field, ObjectType } from '@nestjs/graphql'
import { UserModel } from '../../users/models/user.model'

@ObjectType()
export class AuthModel {
	@Field(() => String)
	accessToken: string

	@Field(() => String)
	refreshToken: string

	@Field(() => UserModel)
	user: UserModel
}
