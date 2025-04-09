import { PrismaService } from '@/core/prisma/prisma.service'
import { RedisService } from '@/core/redis/redis.service'
import { BaseService } from '@/shared/base/base.service'
import { ConflictException, Injectable } from '@nestjs/common'
import { Student } from '@prisma/client'
import { StudentHistoriesService } from '../student-histories/student-histories.service'
import { StudentInput } from './inputs/student.input'
import { StudentParamsInput } from './inputs/student.params.input'
import { UpdateStudentInput } from './inputs/update-student.input'
@Injectable()
export class StudentsService extends BaseService<
	Student,
	StudentInput,
	UpdateStudentInput
> {
	constructor(
		private readonly prisma: PrismaService,
		private readonly histories: StudentHistoriesService,
		private readonly redis: RedisService
	) {
		super(prisma, 'Student')
	}

	async create(createDto: StudentInput): Promise<Student> {
		const student = await super.create(createDto)

		await this.redis.del('students')

		return student
	}

	async removeMany(ids: string[]): Promise<boolean> {
		const result = await super.removeMany(ids)

		await this.redis.del('students')

		return result
	}

	async removeAll(): Promise<{ count: number }> {
		const result = await super.removeAll()

		await this.redis.del('students')

		return result
	}

	async getAll({ params }: { params?: StudentParamsInput }) {
		try {
			const {
				page = 1,
				limit = 10,
				lastName,
				departmentTitle,
				courseNumber,
				groupTitle,
				isExpelled,
				orderBy
			} = params || {}
			const skipCount = (page - 1) * limit

			this.logger.log(
				`Fetching students with params: ${JSON.stringify(params)}`
			)

			// const cachedStudents = await this.redis.get('students')

			// if (cachedStudents) {
			// 	this.logger.log('Fetching students from cache')
			// 	return SuperJSON.parse(cachedStudents)
			// }

			const students = await this.prisma.student.findMany({
				orderBy: { lastName: orderBy },
				include: {
					certificates: true,
					group: {
						include: {
							course: {
								include: {
									department: true
								}
							}
						}
					}
				},
				where: {
					lastName: lastName
						? { contains: lastName, mode: 'insensitive' }
						: undefined,
					group: {
						title: groupTitle
							? { contains: groupTitle, mode: 'insensitive' }
							: undefined,
						course: {
							number: courseNumber ? courseNumber : undefined,
							department: departmentTitle
								? { title: { contains: departmentTitle, mode: 'insensitive' } }
								: undefined
						}
					},
					isExpelled: isExpelled ?? undefined
				},
				skip: skipCount,
				take: limit
			})

			if (!students) throw new ConflictException('Students not found')
			this.logger.log(`Found ${students.length} students`)

			// await this.redis.set('students', SuperJSON.stringify(students), 10)

			return students
		} catch (error) {
			this.logger.error(
				`Error fetching students: ${error.message}`,
				error.stack
			)
			throw error
		}
	}
	async getById(id: string) {
		try {
			this.logger.log(`Fetching student by ID: ${id}`)
			const student = await this.prisma.student.findUnique({
				where: { id },
				include: {
					group: {
						include: {
							course: {
								include: {
									department: true
								}
							}
						}
					},
					certificates: true
				}
			})

			if (!student) {
				this.logger.warn(`healthGroup not found with ID: ${id}`)
				throw new ConflictException('Student not found!')
			}
			this.logger.log(`Successfully fetched student with ID: ${id}`)
			return {
				...student,
				birthDate: new Date(student.birthDate)
			}
		} catch (error) {
			this.logger.error(
				`Error fetching healthGroup by ID ${id}: ${error.message}`,
				error.stack
			)
			throw error
		}
	}

	async update(id: string, data: UpdateStudentInput) {
		const updated = await super.update(id, data)

		await this.histories.create({
			studentId: id,
			groupId: data.groupId
		})
		await this.redis.del('students')
		return updated
	}

	async remove(id: string) {
		try {
			await super.remove(id)
			this.redis.del('students')
			return true
		} catch {
			return false
		}
	}
}
