import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateCertificateInput {
	@Field(() => Date, { nullable: true })
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
