import { BaseModel } from '@/shared/base/base.model'
import { Field, ObjectType } from '@nestjs/graphql'
import { CuratorModel } from './curator.model'

@ObjectType()
export class UserModel extends BaseModel {
	@Field(() => String)
	login: string

	@Field(() => String)
	role: string

	@Field(() => CuratorModel, { nullable: true })
	curator?: CuratorModel
}
