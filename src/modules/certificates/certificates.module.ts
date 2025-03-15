import { Module } from '@nestjs/common'
import { CertificateHistoriesService } from '../certificate-histories/certificate-histories.service'
import { CertificatesResolver } from './certificates.resolver'
import { CertificatesService } from './certificates.service'

@Module({
	providers: [
		CertificatesResolver,
		CertificatesService,
		CertificateHistoriesService
	]
})
export class CertificatesModule {}
