import { CertificateDateValidator } from '@/shared/validators/certificate-date.validator'
import { Field, InputType } from '@nestjs/graphql'
import { Validate } from 'class-validator'

@InputType()
export class CertificateInput {
	@Field(() => Date)
	@Validate(CertificateDateValidator)
	startDate: Date
	@Field(() => Date)
	finishDate: Date
	@Field(() => String)
	studentId: string
	@Field(() => String)
	healthGroupId: string
	@Field(() => String)
	physicalEducationId: string
}
