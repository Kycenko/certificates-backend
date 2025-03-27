import { PrismaService } from '@/core/prisma/prisma.service'
import { ConflictException, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { CustomLogger } from '../utils/custom-logger'

@Injectable()
export class BaseService<T, CreateInput, UpdateInput = Partial<CreateInput>> {
	constructor(
		protected readonly prismaService: PrismaService,
		private readonly prismaModel: Prisma.ModelName,
		private readonly logger: CustomLogger = new CustomLogger()
	) {}

	async create(createDto: CreateInput): Promise<T> {
		try {
			const result = await this.prismaService[this.prismaModel].create({
				data: createDto
			})

			this.logger.log(
				`${this.prismaModel} created`,
				JSON.stringify({ data: createDto })
			)
			return result
		} catch (error) {
			this.logger.error(`Error creating ${this.prismaModel}`, error)
			throw error
		}
	}

	async update(id: string, updateDto: UpdateInput): Promise<T> {
		try {
			const result = await this.prismaService[this.prismaModel].update({
				where: { id },
				data: updateDto
			})

			this.logger.log(
				`${this.prismaModel} updated`,
				JSON.stringify({ data: updateDto })
			)
			return result
		} catch (error) {
			this.logger.error(
				`Error updating ${this.prismaModel} with ID ${id}`,
				error
			)
			throw error
		}
	}

	async remove(id: string): Promise<boolean> {
		try {
			await this.prismaService[this.prismaModel].delete({
				where: { id }
			})

			this.logger.log(`${this.prismaModel} deleted`, JSON.stringify({ id }))
			return true
		} catch (error) {
			this.logger.error(
				`Error deleting ${this.prismaModel} with ID ${id}`,
				error
			)
			throw error
		}
	}
	async removeMany(ids: string[]): Promise<boolean> {
		try {
			const existingCount = await this.prismaService[this.prismaModel].count({
				where: { id: { in: ids } }
			})

			if (existingCount !== ids.length) {
				throw new ConflictException('Some IDs not found')
			}

			await this.prismaService[this.prismaModel].deleteMany({
				where: { id: { in: ids } }
			})

			this.logger.log(
				`Multiple ${this.prismaModel} deleted`,
				JSON.stringify({ ids })
			)
			return true
		} catch (error) {
			this.logger.error(
				`Error deleting multiple ${this.prismaModel}`,
				JSON.stringify({ ids, error })
			)
			throw error
		}
	}

	async removeAll(): Promise<{ count: number }> {
		try {
			const result = await this.prismaService[this.prismaModel].deleteMany()

			this.logger.log(
				`All ${this.prismaModel} records deleted`,
				JSON.stringify({ count: result.count })
			)
			return result
		} catch (error) {
			this.logger.error(`Error deleting all ${this.prismaModel} records`, error)
			throw error
		}
	}
}
