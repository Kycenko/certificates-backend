import { AuthRole } from '@/shared/decorators/role.decorator'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CertificateHistoriesService } from './certificate-histories.service'
import { CertificateHistoryInput } from './inputs/certificate-history.input'
import { CertificateHistoryModel } from './models/certificate-history.model'

@Resolver()
export class CertificateHistoriesResolver {
	constructor(
		private readonly certificateHistoriesService: CertificateHistoriesService
	) {}

	@Mutation(() => CertificateHistoryModel, { name: 'createCertificateHistory' })
	@AuthRole('ADMIN')
	async create(@Args('data') data: CertificateHistoryInput) {
		return this.certificateHistoriesService.create(data)
	}

	@Query(() => [CertificateHistoryModel], {
		name: 'getAllCertificateHistories'
	})
	@AuthRole('ADMIN')
	async getAll(@Args('certificateId') certificateId: string) {
		return this.certificateHistoriesService.getAll(certificateId)
	}

	@Mutation(() => Boolean, { name: 'removeAllCertificateHistories' })
	@AuthRole('ADMIN')
	async removeAll(@Args('certificateId') certificateId: string) {
		return this.certificateHistoriesService.removeAll(certificateId)
	}
}
