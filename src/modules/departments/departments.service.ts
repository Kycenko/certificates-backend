import { PrismaService } from '@/core/prisma/prisma.service'
import { BaseService } from '@/shared/base/base.service'
import { DepartmentParams } from '@/shared/types/params.types'
import { ConflictException, Injectable } from '@nestjs/common'
import { Department } from '@prisma/client'
import { DepartmentInput } from './inputs/department.input'

@Injectable()
export class DepartmentsService extends BaseService<
	Department,
	DepartmentInput
> {
	constructor(private readonly prisma: PrismaService) {
		super(prisma, 'Department')
	}

	async getAll({ params }: { params: DepartmentParams }) {
		return await this.prisma.department.findMany({
			where: { title: { contains: params.title, mode: 'insensitive' } },
			orderBy: {
				title: params.orderBy
			},
			include: {
				courses: true
			}
		})
	}

	async getById(id: string) {
		const department = await this.prisma.department.findUnique({
			where: { id },
			include: {
				courses: true
			}
		})

		if (!department) throw new ConflictException('Department not found!')

		return department
	}

	async getByTitle(title: string) {
		const department = await this.prisma.department.findUnique({
			where: { title },
			include: {
				courses: true
			}
		})

		if (!department) throw new ConflictException('Department not found!')

		return department
	}
}
