import { PrismaService } from '@/core/prisma/prisma.service'
import { RedisService } from '@/core/redis/redis.service'
import { BaseService } from '@/shared/base/base.service'
import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { Certificate } from '@prisma/client'
import { CertificateHistoriesService } from '../certificate-histories/certificate-histories.service'
import { CertificateInput } from './inputs/certificate.input'
import { CertificateParamsInput } from './inputs/certificate.params.input'
import { UpdateCertificateInput } from './inputs/update-certificate.input'

@Injectable()
export class CertificatesService extends BaseService<
	Certificate,
	CertificateInput,
	UpdateCertificateInput
> {
	constructor(
		private readonly prisma: PrismaService,
		private readonly histories: CertificateHistoriesService,
		private readonly redis: RedisService
	) {
		super(prisma, 'Certificate')
	}

	async getAll({ params }: { params?: CertificateParamsInput }) {
		try {
			this.logger.log(
				`Fetching certificates with params: ${JSON.stringify(params)}`
			)

			const cachedCertificates = await this.redis.get('certificates')

			if (cachedCertificates) {
				this.logger.log('Fetching certificates from cache')
				return JSON.parse(cachedCertificates)
			}

			const certificates = await this.prisma.certificate.findMany({
				where: {
					student: {
						lastName: { contains: params?.studentLastName, mode: 'insensitive' }
					}
				},

				orderBy: {
					student: {
						lastName: params?.orderBy
					}
				},

				include: {
					student: true,
					physicalEducation: true,
					healthGroup: true
				}
			})

			if (!certificates) throw new ConflictException('Certificates not found')
			this.logger.log(`Found ${certificates.length} certificates`)

			await this.redis.set('certificates', JSON.stringify(certificates), 60)

			return certificates
		} catch (error) {
			this.logger.error(
				`Error fetching certificates: ${error.message}`,
				error.stack
			)
			throw error
		}
	}

	async getById(id: string) {
		try {
			this.logger.log(`Fetching certificate by ID: ${id}`)
			const certificate = await this.prisma.certificate.findUnique({
				where: { id },
				include: {
					student: true,
					physicalEducation: true,
					healthGroup: true
				}
			})

			if (!certificate) {
				this.logger.warn(`certificate not found with ID: ${id}`)
				throw new NotFoundException(`certificate not found!`)
			}

			this.logger.log(`Successfully fetched certificate with ID: ${id}`)
			return certificate
		} catch (error) {
			this.logger.error(
				`Error fetching certificate by ID ${id}: ${error.message}`,
				error.stack
			)
			throw error
		}
	}

	async update(id: string, data: UpdateCertificateInput) {
		const updated = await super.update(id, data)

		await this.histories.create({
			certificateId: id,
			startDate: data.startDate || updated.startDate,
			finishDate: data.finishDate || updated.finishDate,
			healthGroupId: data.healthGroupId,
			physicalEducationId: data.physicalEducationId
		})

		return updated
	}
}
