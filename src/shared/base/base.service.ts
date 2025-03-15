import { PrismaService } from '@/core/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
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
		this.logger.log(`${this.prismaModel} created`)

		return this.prismaService[this.prismaModel].create({
			data: createDto
		})
	}

	async update(id: string, updateDto: UpdateInput): Promise<T> {
		this.logger.log(`${this.prismaModel} updated`)

		return this.prismaService[this.prismaModel].update({
			where: { id },
			data: updateDto
		})
	}

	async remove(id: string): Promise<boolean> {
		await this.prismaService[this.prismaModel].delete({
			where: { id }
		})

		this.logger.log(`${this.prismaModel} with ID ${id} deleted`)
		return true
	}

	async removeMany(ids: string[]): Promise<boolean> {
		await this.prismaService[this.prismaModel].deleteMany({
			where: { id: { in: ids } }
		})

		this.logger.log(`${this.prismaModel} with IDs ${ids} deleted`)
		return true
	}

	async removeAll(): Promise<boolean> {
		await this.prismaService[this.prismaModel].deleteMany({})

		this.logger.log(`${this.prismaModel} deleted`)
		return true
	}
}
