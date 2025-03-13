import { PrismaService } from '@/core/prisma/prisma.service'
import { BaseService } from '@/shared/base/base.service'
import { PhysicalEducationParams } from '@/shared/types/params.types'
import { ConflictException, Injectable } from '@nestjs/common'
import { PhysicalEducation } from '@prisma/client'
import { PhysicalEducationInput } from './inputs/physical-education.input'

@Injectable()
export class PhysicalEducationsService extends BaseService<
	PhysicalEducation,
	PhysicalEducationInput
> {
	constructor(private readonly prisma: PrismaService) {
		super(prisma, 'PhysicalEducation')
	}

	async getAll({ params }: { params: PhysicalEducationParams }) {
		return await this.prisma.physicalEducation.findMany({
			where: { title: { contains: params.title, mode: 'insensitive' } },
			orderBy: {
				title: params.orderBy
			}
		})
	}

	async getById(id: string) {
		const physicalEducation = await this.prisma.physicalEducation.findUnique({
			where: { id }
		})

		if (!physicalEducation)
			throw new ConflictException('PhysicalEducation not found!')

		return physicalEducation
	}

	async getByTitle(title: string) {
		const physicalEducation = await this.prisma.physicalEducation.findUnique({
			where: { title }
		})

		if (!physicalEducation)
			throw new ConflictException('PhysicalEducation not found!')

		return physicalEducation
	}
}
