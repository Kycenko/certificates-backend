import { CourseModel } from '@/modules/courses/models/course.model'
import { BaseModel } from '@/shared/base/base.model'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class GroupModel extends BaseModel {
	@Field(() => String)
	title: string

	@Field(() => String, { nullable: true })
	courseId?: string

	@Field(() => CourseModel, { nullable: true })
	course?: CourseModel
}
