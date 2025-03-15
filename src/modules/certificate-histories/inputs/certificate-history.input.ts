import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CertificateHistoryInput {
	@Field(() => Date)
	startDate: Date
	@Field(() => Date)
	finishDate: Date
	@Field(() => String, { nullable: true })
	healthGroupId?: string
	@Field(() => String, { nullable: true })
	physicalEducationId?: string
	@Field(() => String)
	certificateId: string
}
