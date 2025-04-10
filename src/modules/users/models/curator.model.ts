import { GroupModel } from '@/modules/groups/models/group.model'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class CuratorModel {
	@Field(() => String)
	displayedName: string

	@Field(() => String)
	groupId: string

	@Field(() => GroupModel)
	group: GroupModel
}
