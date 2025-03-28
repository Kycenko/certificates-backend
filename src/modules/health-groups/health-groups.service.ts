import { PrismaService } from '@/core/prisma/prisma.service'
import { BaseService } from '@/shared/base/base.service'
import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { HealthGroup } from '@prisma/client'
import { HealthGroupInput } from './inputs/health-group.input'
import { HealthGroupParamsInput } from './inputs/health-group.params.input'

@Injectable()
export class HealthGroupsService extends BaseService<
	HealthGroup,
	HealthGroupInput
> {
	constructor(private readonly prisma: PrismaService) {
		super(prisma, 'HealthGroup')
	}

	async getAll({ params }: { params?: HealthGroupParamsInput }) {
		try {
			this.logger.log(
				`Fetching healthGroups with params: ${JSON.stringify(params)}`
			)

			const healthGroups = await this.prisma.healthGroup.findMany({
				where: { title: { contains: params?.title, mode: 'insensitive' } },
				orderBy: {
					title: params?.orderBy
				},
				include: {
					certificates: {
						include: {
							student: true
						}
					}
				}
			})

			if (!healthGroups) throw new ConflictException('HealthGroups not found')
			this.logger.log(`Found ${healthGroups.length} healthGroups`)

			return healthGroups
		} catch (error) {
			this.logger.error(
				`Error fetching healthGroups: ${error.message}`,
				error.stack
			)
			throw error
		}
	}

	async getById(id: string) {
		try {
			this.logger.log(`Fetching healthGroup by ID: ${id}`)

			const healthGroup = await this.prisma.healthGroup.findUnique({
				where: { id },
				include: {
					certificates: {
						include: {
							student: true
						}
					}
				}
			})

			if (!healthGroup) {
				this.logger.warn(`healthGroup not found with ID: ${id}`)
				throw new NotFoundException(`healthGroup not found!`)
			}

			this.logger.log(`Successfully fetched healthGroup with ID: ${id}`)
			return healthGroup
		} catch (error) {
			this.logger.error(
				`Error fetching healthGroup by ID ${id}: ${error.message}`,
				error.stack
			)
			throw error
		}
	}

	async getByTitle(title: string) {
		const healthGroup = await this.prisma.healthGroup.findUnique({
			where: { title }
		})

		if (!healthGroup) throw new ConflictException('HealthGroup not found!')

		return healthGroup
	}
}
