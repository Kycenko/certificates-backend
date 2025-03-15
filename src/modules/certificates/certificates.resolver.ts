import { Resolver } from '@nestjs/graphql';
import { CertificatesService } from './certificates.service';

@Resolver()
export class CertificatesResolver {
  constructor(private readonly certificatesService: CertificatesService) {}
}
