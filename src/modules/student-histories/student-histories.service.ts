import { PrismaService } from '@/core/prisma/prisma.service'
import { ConflictException, Injectable } from '@nestjs/common'
import { StudentHistoryInput } from './inputs/student-history.input'

@Injectable()
export class StudentHistoriesService {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: StudentHistoryInput) {
		return this.prisma.studentHistory.create({
			data
		})
	}

	async getAll(studentId: string) {
		const studentHistories = await this.prisma.studentHistory.findMany({
			where: { studentId },
			include: {
				group: true,
				student: true
			}
		})

		if (!studentHistories)
			throw new ConflictException('StudentHistories not found')

		return studentHistories
	}

	async removeAll(studentId: string) {
		await this.prisma.studentHistory.deleteMany({
			where: { studentId }
		})
	}
}
