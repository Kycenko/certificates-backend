import { AuthRole } from '@/shared/decorators/role.decorator'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CoursesService } from './courses.service'
import { CourseInput } from './inputs/course.input'
import { CourseParamsInput } from './inputs/course.params.input'
import { UpdateCourseInput } from './inputs/update-course.input'
import { CourseModel } from './models/course.model'

@Resolver()
export class CoursesResolver {
	constructor(private readonly coursesService: CoursesService) {}

	@Mutation(() => CourseModel, { name: 'createCourse' })
	@AuthRole('admin')
	async create(@Args('data') data: CourseInput) {
		return this.coursesService.create(data)
	}

	@Query(() => [CourseModel], { name: 'getAllCourses' })
	@AuthRole('admin')
	async getAll(@Args('params') params: CourseParamsInput) {
		return this.coursesService.getAll({ params })
	}

	@Query(() => CourseModel, { name: 'getCourseById' })
	@AuthRole('admin')
	async getById(@Args('id') id: string) {
		return this.coursesService.getById(id)
	}

	@Mutation(() => CourseModel, { name: 'updateCourse' })
	@AuthRole('admin')
	async update(@Args('id') id: string, @Args('data') data: UpdateCourseInput) {
		return this.coursesService.update(id, data)
	}

	@Mutation(() => Boolean, { name: 'removeCourse' })
	@AuthRole('admin')
	async remove(@Args('id') id: string) {
		return this.coursesService.remove(id)
	}
}
