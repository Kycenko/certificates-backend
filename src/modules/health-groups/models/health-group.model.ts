import { BaseModel } from '@/shared/base/base.model'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class HealthGroupModel extends BaseModel {
	@Field(() => String)
	title: string
}
