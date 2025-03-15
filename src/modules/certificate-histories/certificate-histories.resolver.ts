import { Resolver } from '@nestjs/graphql';
import { CertificateHistoriesService } from './certificate-histories.service';

@Resolver()
export class CertificateHistoriesResolver {
  constructor(private readonly certificateHistoriesService: CertificateHistoriesService) {}
}
