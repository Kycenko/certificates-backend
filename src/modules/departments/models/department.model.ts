import { CourseModel } from '@/modules/courses/models/course.model'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class DepartmentModel {
	@Field(() => String)
	title: string

	@Field(() => [CourseModel], { nullable: true })
	courses?: CourseModel[]
}
