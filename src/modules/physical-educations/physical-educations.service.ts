import { PrismaService } from '@/core/prisma/prisma.service'
import { BaseService } from '@/shared/base/base.service'
import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { PhysicalEducation } from '@prisma/client'
import { PhysicalEducationInput } from './inputs/physical-education.input'
import { PhysicalEducationParamsInput } from './inputs/physical-education.params.input'

@Injectable()
export class PhysicalEducationsService extends BaseService<
	PhysicalEducation,
	PhysicalEducationInput
> {
	constructor(private readonly prisma: PrismaService) {
		super(prisma, 'PhysicalEducation')
	}

	async getAll({ params }: { params?: PhysicalEducationParamsInput }) {
		try {
			this.logger.log(
				`Fetching physicalEducations with params: ${JSON.stringify(params)}`
			)

			const physicalEducations = await this.prisma.physicalEducation.findMany({
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

			if (!physicalEducations)
				throw new ConflictException('physicalEducations not found')
			this.logger.log(`Found ${physicalEducations.length} physicalEducations`)

			return physicalEducations
		} catch (error) {
			this.logger.error(
				`Error fetching physicalEducations: ${error.message}`,
				error.stack
			)
			throw error
		}
	}

	async getById(id: string) {
		try {
			this.logger.log(`Fetching physicalEducation by ID: ${id}`)

			const healthGroup = await this.prisma.physicalEducation.findUnique({
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
				this.logger.warn(`physicalEducation not found with ID: ${id}`)
				throw new NotFoundException(`physicalEducation not found!`)
			}

			this.logger.log(`Successfully fetched physicalEducation with ID: ${id}`)
			return healthGroup
		} catch (error) {
			this.logger.error(
				`Error fetching physicalEducation by ID ${id}: ${error.message}`,
				error.stack
			)
			throw error
		}
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
