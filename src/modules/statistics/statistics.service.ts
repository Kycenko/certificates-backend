import { PrismaService } from '@/core/prisma/prisma.service'
import { DepartmentStatistics } from '@/shared/types/params.types'
import { Injectable } from '@nestjs/common'

@Injectable()
export class StatisticsService {
	constructor(private readonly prisma: PrismaService) {}

	async getDepartmentStatistics({ params }: { params: DepartmentStatistics }) {
		const { id } = params
		return this.prisma.department.findUnique({
			where: { id },

			select: {
				courses: {}
			}
		})
	}
}
