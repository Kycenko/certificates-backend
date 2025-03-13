import { PrismaService } from '@/core/prisma/prisma.service'
import { BaseService } from '@/shared/base/base.service'
import { ConflictException, Injectable } from '@nestjs/common'
import { Course } from '@prisma/client'
import { CourseInput } from './inputs/course.input'
import { CourseParamsInput } from './inputs/course.params.input'
import { UpdateCourseInput } from './inputs/update-course.input'

@Injectable()
export class CoursesService extends BaseService<
	Course,
	CourseInput,
	UpdateCourseInput
> {
	constructor(private readonly prisma: PrismaService) {
		super(prisma, 'Course')
	}

	async getAll({ params }: { params: CourseParamsInput }) {
		const courses = await this.prisma.course.findMany({
			where: {
				department: {
					title: { contains: params.departmentTitle, mode: 'insensitive' }
				}
			},
			orderBy: {
				number: params.orderBy
			},
			include: {
				department: true,
				groups: true
			}
		})

		if (!courses) throw new ConflictException('Courses not found')

		return courses
	}

	async getById(id: string) {
		const course = await this.prisma.course.findUnique({
			where: { id },
			include: {
				department: true,
				groups: true
			}
		})

		if (!course) throw new ConflictException('Course not found')

		return course
	}
}
