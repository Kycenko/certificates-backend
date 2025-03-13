import { Module } from '@nestjs/common';
import { PhysicalEducationsService } from './physical-educations.service';
import { PhysicalEducationsResolver } from './physical-educations.resolver';

@Module({
  providers: [PhysicalEducationsResolver, PhysicalEducationsService],
})
export class PhysicalEducationsModule {}
