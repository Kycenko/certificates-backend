import { PrismaService } from '@/core/prisma/prisma.service'
import { ConflictException, Injectable } from '@nestjs/common'
import { CertificateHistoryInput } from './inputs/certificate-history.input'

@Injectable()
export class CertificateHistoriesService {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: CertificateHistoryInput) {
		return this.prisma.certificateHistory.create({
			data
		})
	}

	async getAll(certificateId: string) {
		const certificateHistories = await this.prisma.certificateHistory.findMany({
			where: { certificateId },
			include: {
				certificate: true,
				healthGroup: true,
				physicalEducation: true
			}
		})

		if (!certificateHistories)
			throw new ConflictException('CertificateHistories not found')

		return certificateHistories
	}

	async removeAll(id: string) {
		await this.prisma.certificateHistory.deleteMany({
			where: { id }
		})
	}
}
