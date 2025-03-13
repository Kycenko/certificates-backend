import { PrismaService } from '@/core/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

@Injectable()
export class BaseService<T, CreateInput, UpdateInput = Partial<CreateInput>> {
	constructor(
		protected readonly prismaService: PrismaService,
		private readonly prismaModel: Prisma.ModelName
	) {}

	async create(createDto: CreateInput): Promise<T> {
		return this.prismaService[this.prismaModel].create({
			data: createDto
		})
	}

	// async getAll(): Promise<T[]> {
	// 	const data = await this.prismaService[this.prismaModel].findMany()

	// 	if (!data) throw new ConflictException(`${this.prismaModel} not found`)

	// 	return data
	// }

	// async getById(id: string): Promise<T | null> {
	// 	const data = await this.prismaService[this.prismaModel].findUnique({
	// 		where: {
	// 			id
	// 		}
	// 	})

	// 	if (!data) throw new ConflictException(`${this.prismaModel} not found`)

	// 	return data
	// }

	async update(id: string, updateDto: UpdateInput): Promise<T> {
		// await this.getById(id)

		return this.prismaService[this.prismaModel].update({
			where: { id },
			data: updateDto
		})
	}

	async remove(id: string): Promise<boolean> {
		// await this.getById(id)

		await this.prismaService[this.prismaModel].delete({
			where: { id }
		})
		return true
	}
}
