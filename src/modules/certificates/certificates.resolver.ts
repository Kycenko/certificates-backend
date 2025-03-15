import { AuthRole } from '@/shared/decorators/role.decorator'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CertificatesService } from './certificates.service'
import { CertificateInput } from './inputs/certificate.input'
import { CertificateParamsInput } from './inputs/certificate.params.input'
import { UpdateCertificateInput } from './inputs/update-certificate.input'
import { CertificateModel } from './models/certificate.model'

@Resolver()
export class CertificatesResolver {
	constructor(private readonly certificatesService: CertificatesService) {}

	@Mutation(() => CertificateModel, { name: 'createCertificate' })
	@AuthRole('admin')
	async create(@Args('data') data: CertificateInput) {
		return this.certificatesService.create(data)
	}

	@Query(() => [CertificateModel], { name: 'getAllCertificates' })
	@AuthRole('admin')
	async getAll(@Args('params') params: CertificateParamsInput) {
		return this.certificatesService.getAll({ params })
	}

	@Query(() => CertificateModel, { name: 'getCertificateById' })
	@AuthRole('admin')
	async getById(@Args('id') id: string) {
		return this.certificatesService.getById(id)
	}

	@Mutation(() => CertificateModel, { name: 'updateCertificate' })
	@AuthRole('admin')
	async update(
		@Args('id') id: string,
		@Args('data') data: UpdateCertificateInput
	) {
		return this.certificatesService.update(id, data)
	}

	@Mutation(() => Boolean, { name: 'removeCertificate' })
	@AuthRole('admin')
	async remove(@Args('id') id: string) {
		return this.certificatesService.remove(id)
	}
}
