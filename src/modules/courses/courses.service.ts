import { PrismaService } from '@/core/prisma/prisma.service'
import { BaseService } from '@/shared/base/base.service'
import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
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
		try {
			this.logger.log(`Fetching courses with params: ${JSON.stringify(params)}`)

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
			this.logger.log(`Found ${courses.length} courses`)

			return courses
		} catch (error) {
			this.logger.error(`Error fetching courses: ${error.message}`, error.stack)
			throw error
		}
	}

	async getById(id: string) {
		try {
			this.logger.log(`Fetching course by ID: ${id}`)
			const course = await this.prisma.course.findUnique({
				where: { id },
				include: {
					department: true,
					groups: true
				}
			})

			if (!course) {
				this.logger.warn(`Course not found with ID: ${id}`)
				throw new NotFoundException('Course not found!')
			}

			this.logger.log(`Successfully fetched course with ID: ${id}`)
			return course
		} catch (error) {
			this.logger.error(
				`Error fetching course by ID ${id}: ${error.message}`,
				error.stack
			)
			throw error
		}
	}
}
