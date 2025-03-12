import { PrismaService } from '@/core/prisma/prisma.service'
import { RedisService } from '@/core/redis/redis.service'
import { ConflictException, Injectable } from '@nestjs/common'
import { DepartmentInput } from './inputs/department.input'

@Injectable()
export class DepartmentsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly redis: RedisService
	) {}

	async create(input: DepartmentInput) {
		const existingDepartment = await this.prisma.department.findUnique({
			where: { title: input.title }
		})

		if (existingDepartment)
			throw new ConflictException('Department with this title already exists')

		// Создаем новый отдел
		return this.prisma.department.create({
			data: { title: input.title }
		})
	}

	async getAll(title?: string, orderBy: 'asc' | 'desc' = 'asc') {
		const data = await this.redis.get('departments')

		if (data) return JSON.parse(data)

		const departments = await this.prisma.department.findMany({
			where: { title: { contains: title, mode: 'insensitive' } },
			orderBy: {
				title: orderBy
			}
		})

		await this.redis.set('departments', JSON.stringify(departments))

		return departments
	}

	async getById(id: string) {
		const department = await this.prisma.department.findUnique({
			where: { id }
		})

		if (!department) throw new ConflictException('Department not found!')

		return department
	}

	async getByTitle(title: string) {
		const department = await this.prisma.department.findUnique({
			where: { title }
		})

		if (!department) throw new ConflictException('Department not found!')

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
