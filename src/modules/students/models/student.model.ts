import { CertificateModel } from '@/modules/certificates/models/certificate.model'
import { GroupModel } from '@/modules/groups/models/group.model'
import { StudentHistoryModel } from '@/modules/student-histories/models/student-history.model'
import { BaseModel } from '@/shared/base/base.model'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class StudentModel extends BaseModel {
	@Field(() => String)
	firstName: string
	@Field(() => String)
	lastName: string
	@Field(() => String, { nullable: true })
	secondName?: string
	@Field(() => Date)
	birthDate: Date
	@Field(() => String, { nullable: true })
	groupId?: string
	@Field(() => Boolean)
	isExpelled: boolean
	@Field(() => GroupModel, { nullable: true })
	group?: GroupModel
	@Field(() => [CertificateModel], { nullable: true })
	certificates: CertificateModel[]
	@Field(() => [StudentHistoryModel], { nullable: true })
	studentHistories: StudentHistoryModel[]
}
