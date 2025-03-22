import { Module } from '@nestjs/common'
import { DepartmentsService } from '../departments/departments.service'
import { CoursesResolver } from './courses.resolver'
import { CoursesService } from './courses.service'

@Module({
	providers: [CoursesResolver, CoursesService, DepartmentsService]
})
export class CoursesModule {}
