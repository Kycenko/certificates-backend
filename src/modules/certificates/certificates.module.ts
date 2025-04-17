import { CertificateDateValidator } from '@/shared/validators/certificate-date.validator'
import { Module } from '@nestjs/common'
import { CertificatesResolver } from './certificates.resolver'
import { CertificatesService } from './certificates.service'

@Module({
	providers: [
		CertificatesResolver,
		CertificatesService,
		CertificateDateValidator
	]
})
export class CertificatesModule {}
