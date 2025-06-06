import { UserModel } from '@/modules/users/models/user.model'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AuthModel {
	@Field(() => String)
	accessToken: string

	@Field(() => String)
	refreshToken: string

	@Field(() => UserModel)
	user: UserModel
}
