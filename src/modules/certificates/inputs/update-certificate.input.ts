import { InputType, PartialType } from '@nestjs/graphql'
import { CertificateInput } from './certificate.input'

@InputType()
export class UpdateCertificateInput extends PartialType(CertificateInput) {}
