import { InputType, PartialType } from '@nestjs/graphql'
import { StudentInput } from './student.input'

@InputType()
export class UpdateStudentInput extends PartialType(StudentInput) {}
