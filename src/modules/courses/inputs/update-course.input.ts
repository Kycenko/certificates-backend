import { InputType, PartialType } from '@nestjs/graphql'
import { CourseInput } from './course.input'

@InputType()
export class UpdateCourseInput extends PartialType(CourseInput) {}
