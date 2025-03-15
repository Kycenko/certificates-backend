import { GroupModel } from '@/modules/groups/models/group.model'
import { BaseModel } from '@/shared/base/base.model'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class StudentModel extends BaseModel {
	@Field(() => String)
	firstName: string
	@Field(() => String)
	lastName: string
	@Field(() => String, { nullable: true })
	secondName?: string
	@Field(() => Date)
	birthDate: Date
	@Field(() => String, { nullable: true })
	groupId?: string
	@Field(() => Boolean)
	isExpelled: boolean
	@Field(() => GroupModel)
	group: GroupModel
	// @Field(() => String)
	// certificates
	// @Field(() => String)
	// studentHistories
}
