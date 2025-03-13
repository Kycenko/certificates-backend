import { DepartmentModel } from '@/modules/departments/models/department.model'
import { GroupModel } from '@/modules/groups/models/group.model'
import { BaseModel } from '@/shared/base/base.model'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class CourseModel extends BaseModel {
	@Field(() => Number)
	number: number

	@Field(() => String)
	departmentId: string

	@Field(() => [GroupModel], { nullable: true })
	groups?: GroupModel[]

	@Field(() => DepartmentModel)
	department: DepartmentModel
}
