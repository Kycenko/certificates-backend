import { GroupModel } from '@/modules/groups/models/group.model'
import { StudentModel } from '@/modules/students/models/student.model'
import { BaseModel } from '@/shared/base/base.model'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class StudentHistoryModel extends BaseModel {
	@Field(() => String)
	studentId: string
	@Field(() => String, { nullable: true })
	groupId?: string
	@Field(() => GroupModel, { nullable: true })
	group?: GroupModel
	@Field(() => GroupModel)
	student: StudentModel
}
