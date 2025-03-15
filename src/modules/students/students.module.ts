import { Module } from '@nestjs/common'
import { StudentHistoriesService } from '../student-histories/student-histories.service'
import { StudentsResolver } from './students.resolver'
import { StudentsService } from './students.service'

@Module({
	providers: [StudentsResolver, StudentsService, StudentHistoriesService]
})
export class StudentsModule {}
