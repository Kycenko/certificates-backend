import { CourseModel } from '@/modules/courses/models/course.model'
import { BaseModel } from '@/shared/base/base.model'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class DepartmentModel extends BaseModel {
	@Field(() => String)
	title: string

	@Field(() => [CourseModel], { nullable: true })
	courses?: CourseModel[]
}
