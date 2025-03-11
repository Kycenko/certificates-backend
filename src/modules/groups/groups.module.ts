import { Module } from '@nestjs/common'
import { GroupsResolver } from './groups.resolver'
import { GroupsService } from './groups.service'

@Module({
	providers: [GroupsResolver, GroupsService]
})
export class GroupsModule {}
