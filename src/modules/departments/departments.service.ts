import { PrismaService } from '@/core/prisma/prisma.service'
import { ConflictException, Injectable } from '@nestjs/common'
import { DepartmentInput } from './inputs/department.input'

@Injectable()
export class DepartmentsService {
	constructor(private readonly prisma: PrismaService) {}

	async create(input: DepartmentInput) {
		const existedDepartment = await this.getByTitle(input.title)

		if (existedDepartment)
			throw new ConflictException('Department already exists')

		return this.prisma.department.create({ data: { title: input.title } })
	}

	async getAll(title?: string, orderBy: 'asc' | 'desc' = 'asc') {
		return this.prisma.department.findMany({
			where: { title: { contains: title, mode: 'insensitive' } },
			orderBy: {
				title: orderBy
			}
		})
	}

	async getById(id: string) {
		const department = await this.prisma.department.findUnique({
			where: { id }
		})

		if (!department) throw new ConflictException('Department not found')

		return department
	}

	async getByTitle(title: string) {
		const department = await this.prisma.department.findUnique({
			where: { title }
		})

		if (!department) throw new ConflictException('Department not found')

		return department
	}

	async update(id: string, input: DepartmentInput) {
		await this.getByTitle(input.title)

		return this.prisma.department.update({
			where: { id },
			data: { title: input.title }
		})
	}

	async remove(id: string) {
		return this.prisma.department.delete({ where: { id } })
	}
}
