import { Module } from '@nestjs/common';
import { HealthGroupsService } from './health-groups.service';
import { HealthGroupsResolver } from './health-groups.resolver';

@Module({
  providers: [HealthGroupsResolver, HealthGroupsService],
})
export class HealthGroupsModule {}
