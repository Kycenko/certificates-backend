import { BaseModel } from '@/shared/base/base.model'
import { Field, ObjectType } from '@nestjs/graphql'
import { MaxLength, MinLength } from 'class-validator'

@ObjectType()
export class PhysicalEducationModel extends BaseModel {
	@Field(() => String)
	@MinLength(3)
	@MaxLength(20)
	title: string
}
