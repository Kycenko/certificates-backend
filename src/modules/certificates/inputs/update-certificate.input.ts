import { CertificateDateValidator } from '@/shared/validators/certificate-date.validator'
import { Field, InputType } from '@nestjs/graphql'
import { Validate } from 'class-validator'

@InputType()
export class UpdateCertificateInput {
	@Field(() => Date, { nullable: true })
	@Validate(CertificateDateValidator)
	startDate?: Date
	@Field(() => Date, { nullable: true })
	finishDate?: Date
	@Field(() => String, { nullable: true })
	studentId?: string
	@Field(() => String, { nullable: true })
	healthGroupId?: string
	@Field(() => String, { nullable: true })
	physicalEducationId?: string
}
