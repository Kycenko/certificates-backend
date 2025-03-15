import { CertificateModel } from '@/modules/certificates/models/certificate.model'
import { HealthGroupModel } from '@/modules/health-groups/models/health-group.model'
import { PhysicalEducationModel } from '@/modules/physical-educations/models/physical-education.model'
import { BaseModel } from '@/shared/base/base.model'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class CertificateHistoryModel extends BaseModel {
	@Field(() => Date)
	startDate: Date
	@Field(() => Date)
	finishDate: Date
	@Field(() => String, { nullable: true })
	healthGroupId?: string
	@Field(() => String)
	physicalEducationId?: string
	@Field(() => String)
	certificateId: string
	@Field(() => HealthGroupModel, { nullable: true })
	healthGroup?: HealthGroupModel
	@Field(() => PhysicalEducationModel, { nullable: true })
	physicalEducation?: PhysicalEducationModel
	@Field(() => CertificateModel)
	certificate: CertificateModel
}
