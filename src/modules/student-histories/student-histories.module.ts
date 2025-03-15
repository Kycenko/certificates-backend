import { Module } from '@nestjs/common'
import { StudentHistoriesService } from './student-histories.service'
import { StudentHistoriesResolver } from './student-histories.resolver'

@Module({
	providers: [StudentHistoriesResolver, StudentHistoriesService]
})
export class StudentHistoriesModule {}
