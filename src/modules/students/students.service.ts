import { PrismaService } from '@/core/prisma/prisma.service'
import { BaseService } from '@/shared/base/base.service'
import { StudentParams } from '@/shared/types/params.types'
import { ConflictException, Injectable } from '@nestjs/common'
import { Student } from '@prisma/client'
import { StudentInput } from './inputs/student.input'
import { UpdateStudentInput } from './inputs/update-student.input'

@Injectable()
export class StudentsService extends BaseService<
	Student,
	StudentInput,
	UpdateStudentInput
> {
	constructor(private readonly prisma: PrismaService) {
		super(prisma, 'Student')
	}

	async getAll({ params }: { params: StudentParams }) {
		const {
			page = 1,
			limit = 10,
			lastName,
			departmentTitle,
			courseNumber,
			groupTitle,
			isExpelled,
			orderBy
		} = params
		const skipCount = (page - 1) * limit

		const totalStudents = await this.prisma.student.count({
			where: {
				lastName: lastName
					? { contains: lastName, mode: 'insensitive' }
					: undefined,
				group: {
					title: groupTitle
						? { contains: groupTitle, mode: 'insensitive' }
						: undefined
				},

				isExpelled: isExpelled ?? undefined
			}
		})

		const students = await this.prisma.student.findMany({
			orderBy: { lastName: orderBy },
			include: {
				group: true,
				certificates: true
			},
			where: {
				lastName: lastName
					? { contains: lastName, mode: 'insensitive' }
					: undefined,

				isExpelled: isExpelled ?? undefined
			},
			skip: skipCount,
			take: limit
		})

		return students

		// return {
		// 	students,
		// 	total: totalStudents,
		// 	page,
		// 	limit,
		// 	totalPages: Math.ceil(totalStudents / limit)
		// }
	}

	async getById(id: string) {
		const student = await this.prisma.student.findUnique({
			where: { id },
			include: {
				group: true,
				certificates: true
			}
		})

		if (!student) throw new ConflictException('Student not found!')

		return student
	}
}
