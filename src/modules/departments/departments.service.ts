import { PrismaService } from '@/core/prisma/prisma.service'
import { BaseService } from '@/shared/base/base.service'
import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { Department } from '@prisma/client'
import { DepartmentInput } from './inputs/department.input'
import { DepartmentParamsInput } from './inputs/department.params.input'

@Injectable()
export class DepartmentsService extends BaseService<
	Department,
	DepartmentInput
> {
	constructor(private readonly prisma: PrismaService) {
		super(prisma, 'Department')
	}

	async getAll({ params }: { params?: DepartmentParamsInput }) {
		try {
			this.logger.log(
				`Fetching departments with params: ${JSON.stringify(params)}`
			)

			const departments = await this.prisma.department.findMany({
				where: {
					title: {
						contains: params?.title,
						mode: 'insensitive'
					}
				},
				orderBy: { title: params?.orderBy },
				include: { courses: true }
			})

			if (!departments) throw new ConflictException('Departments not found')
			this.logger.log(`Found ${departments.length} departments`)

			return departments
		} catch (error) {
			this.logger.error(
				`Error fetching departments: ${error.message}`,
				error.stack
			)
			throw error
		}
	}

	async getById(id: string) {
		try {
			this.logger.log(`Fetching department by ID: ${id}`)

			const record = await this.prisma.department.findUnique({
				where: { id },
				include: {
					courses: {
						include: {
							groups: true
						}
					}
				}
			})

			if (!record) {
				this.logger.warn(`Department not found with ID: ${id}`)
				throw new NotFoundException(`Department not found!`)
			}

			this.logger.log(`Successfully fetched Department with ID: ${id}`)
			return record
		} catch (error) {
			this.logger.error(
				`Error fetching Department by ID ${id}: ${error.message}`,
				error.stack
			)
			throw error
		}
	}

	async getByTitle(title: string) {
		try {
			this.logger.log(`Fetching department by title: ${title}`)

			const department = await this.prisma.department.findUnique({
				where: { title },
				include: { courses: true }
			})

			if (!department) {
				this.logger.warn(`Department not found with title: ${title}`)
				throw new NotFoundException('Department not found!')
			}

			this.logger.log(`Successfully fetched department with title: ${title}`)
			return department
		} catch (error) {
			this.logger.error(
				`Error fetching department by title ${title}: ${error.message}`,
				error.stack
			)
			throw error
		}
	}
}
