import { PrismaService } from '@/core/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class StatisticsService {
	constructor(private readonly prisma: PrismaService) {}

	async getCountStatistics() {
		const departments = await this.prisma.department.count()
		const courses = await this.prisma.course.count()
		const groups = await this.prisma.group.count()
		const curators = await this.prisma.curator.count()
		const students = await this.prisma.student.count()

		return { departments, courses, groups, curators, students }
	}
}
