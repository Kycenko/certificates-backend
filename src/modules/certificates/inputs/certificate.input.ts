import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CertificateInput {
	@Field(() => Date)
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
