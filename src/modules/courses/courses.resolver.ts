import { RemoveManyInput } from '@/shared/base/remove-many.input'
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
	@AuthRole('ADMIN')
	async create(@Args('data') data: CourseInput) {
		return this.coursesService.create(data)
	}

	@Query(() => [CourseModel], { name: 'getAllCourses' })
	@AuthRole('ADMIN')
	async getAll(@Args('params', { nullable: true }) params?: CourseParamsInput) {
		return this.coursesService.getAll({ params })
	}

	@Query(() => CourseModel, { name: 'getCourseById' })
	@AuthRole('ADMIN')
	async getById(@Args('id') id: string) {
		return this.coursesService.getById(id)
	}

	@Mutation(() => CourseModel, { name: 'updateCourse' })
	@AuthRole('ADMIN')
	async update(@Args('id') id: string, @Args('data') data: UpdateCourseInput) {
		return this.coursesService.update(id, data)
	}

	@Mutation(() => Boolean, { name: 'removeCourse' })
	@AuthRole('ADMIN')
	async remove(@Args('id') id: string) {
		return this.coursesService.remove(id)
	}

	@Mutation(() => Boolean, { name: 'removeManyCourses' })
	@AuthRole('ADMIN')
	async removeMany(@Args() params: RemoveManyInput) {
		return this.coursesService.removeMany(params.ids)
	}

	@Mutation(() => Boolean, { name: 'removeAllCourses' })
	@AuthRole('ADMIN')
	async removeAll() {
		return this.coursesService.removeAll()
	}
}
