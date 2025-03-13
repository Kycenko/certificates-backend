import { PrismaService } from '@/core/prisma/prisma.service'
import { BaseService } from '@/shared/base/base.service'
import { HealthGroupParams } from '@/shared/types/params.types'
import { ConflictException, Injectable } from '@nestjs/common'
import { HealthGroup } from '@prisma/client'
import { HealthGroupInput } from './inputs/health-group.module'

@Injectable()
export class HealthGroupsService extends BaseService<
	HealthGroup,
	HealthGroupInput
> {
	constructor(private readonly prisma: PrismaService) {
		super(prisma, 'HealthGroup')
	}

	async getAll({ params }: { params: HealthGroupParams }) {
		return await this.prisma.healthGroup.findMany({
			where: { title: { contains: params.title, mode: 'insensitive' } },
			orderBy: {
				title: params.orderBy
			}
		})
	}

	async getById(id: string) {
		const healthGroup = await this.prisma.healthGroup.findUnique({
			where: { id }
		})

		if (!healthGroup) throw new ConflictException('HealthGroup not found!')

		return healthGroup
	}

	async getByTitle(title: string) {
		const healthGroup = await this.prisma.healthGroup.findUnique({
			where: { title }
		})

		if (!healthGroup) throw new ConflictException('HealthGroup not found!')

		return healthGroup
	}
}
