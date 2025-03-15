import { Module } from '@nestjs/common';
import { CertificateHistoriesService } from './certificate-histories.service';
import { CertificateHistoriesResolver } from './certificate-histories.resolver';

@Module({
  providers: [CertificateHistoriesResolver, CertificateHistoriesService],
})
export class CertificateHistoriesModule {}
