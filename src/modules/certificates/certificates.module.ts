import { CertificateDateValidator } from '@/shared/validators/certificate-date.validator'
import { Module } from '@nestjs/common'
import { CertificateHistoriesService } from '../certificate-histories/certificate-histories.service'
import { CertificatesResolver } from './certificates.resolver'
import { CertificatesService } from './certificates.service'

@Module({
	providers: [
		CertificatesResolver,
		CertificatesService,
		CertificateHistoriesService,
		CertificateDateValidator
	]
})
export class CertificatesModule {}
