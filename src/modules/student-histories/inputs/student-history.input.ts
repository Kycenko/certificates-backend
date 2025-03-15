import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class StudentHistoryInput {
	@Field(() => String)
	studentId: string
	@Field(() => String, { nullable: true })
	groupId?: string
}
