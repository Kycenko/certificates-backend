import { PrismaService } from '@/core/prisma/prisma.service'
import { BaseService } from '@/shared/base/base.service'
import { CertificateParams } from '@/shared/types/params.types'
import { ConflictException, Injectable } from '@nestjs/common'
import { Certificate } from '@prisma/client'
import { CertificateHistoriesService } from '../certificate-histories/certificate-histories.service'
import { CertificateInput } from './inputs/certificate.input'
import { UpdateCertificateInput } from './inputs/update-certificate.input'

@Injectable()
export class CertificatesService extends BaseService<
	Certificate,
	CertificateInput,
	UpdateCertificateInput
> {
	constructor(
		private readonly prisma: PrismaService,
		private readonly histories: CertificateHistoriesService
	) {
		super(prisma, 'Certificate')
	}

	async getAll({ params }: { params: CertificateParams }) {
		return await this.prisma.certificate.findMany({
			where: {
				student: {
					lastName: { contains: params.studentName, mode: 'insensitive' }
				}
			},
			orderBy: {
				student: {
					lastName: params.orderBy
				}
			},

			include: {
				student: true,
				physicalEducation: true,
				healthGroup: true
			}
		})
	}

	async getById(id: string) {
		return await this.prisma.certificate.findUnique({
			where: { id },
			include: {
				student: true,
				physicalEducation: true,
				healthGroup: true
			}
		})
	}

	async update(id: string, data: UpdateCertificateInput) {
		const certificate = await this.prisma.certificate.findUnique({
			where: { id }
		})

		if (!certificate) throw new ConflictException('Certificate not found!')

		const updated = await this.prisma.certificate.update({
			where: { id },
			data
		})

		await this.histories.create({
			certificateId: id,
			startDate: data.startDate || certificate.startDate,
			finishDate: data.finishDate || certificate.finishDate,
			healthGroupId: data.healthGroupId,
			physicalEducationId: data.physicalEducationId
		})

		return updated
	}
}
