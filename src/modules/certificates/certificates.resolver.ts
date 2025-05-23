import { RemoveManyInput } from '@/shared/base/remove-many.input'
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
	@AuthRole('ADMIN')
	async create(@Args('data') data: CertificateInput) {
		return this.certificatesService.create(data)
	}

	@Query(() => [CertificateModel], { name: 'getAllCertificates' })
	@AuthRole('ADMIN')
	async getAll(
		@Args('params', { nullable: true }) params?: CertificateParamsInput
	) {
		return this.certificatesService.getAll({ params })
	}

	@Query(() => CertificateModel, { name: 'getCertificateById' })
	@AuthRole('ADMIN')
	async getById(@Args('id') id: string) {
		return this.certificatesService.getById(id)
	}

	@Mutation(() => CertificateModel, { name: 'updateCertificate' })
	@AuthRole('ADMIN')
	async update(
		@Args('id') id: string,
		@Args('data') data: UpdateCertificateInput
	) {
		return this.certificatesService.update(id, data)
	}

	@Mutation(() => Boolean, { name: 'removeCertificate' })
	@AuthRole('ADMIN')
	async remove(@Args('id') id: string) {
		return this.certificatesService.remove(id)
	}

	@Mutation(() => Boolean, { name: 'removeManyCertificates' })
	@AuthRole('ADMIN')
	async removeMany(@Args() params: RemoveManyInput) {
		return this.certificatesService.removeMany(params.ids)
	}

	@Mutation(() => Boolean, { name: 'removeAllCertificates' })
	@AuthRole('ADMIN')
	async removeAll() {
		return this.certificatesService.removeAll()
	}
}
