import { BaseModel } from '@/shared/base/base.model'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserModel extends BaseModel {
	@Field(() => String)
	login: string

	@Field(() => Boolean)
	isAdmin: boolean
}
