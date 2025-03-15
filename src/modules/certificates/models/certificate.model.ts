import { HealthGroupModel } from '@/modules/health-groups/models/health-group.model'
import { PhysicalEducationModel } from '@/modules/physical-educations/models/physical-education.model'
import { StudentModel } from '@/modules/students/models/student.model'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class CertificateModel {
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
	@Field(() => HealthGroupModel)
	healthGroup: HealthGroupModel
	@Field(() => PhysicalEducationModel)
	physicalEducation: PhysicalEducationModel
	@Field(() => StudentModel)
	student: StudentModel
}
