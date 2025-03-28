import { PrismaService } from '@/core/prisma/prisma.service'
import { CertificateInput } from '@/modules/certificates/inputs/certificate.input'
import { Injectable } from '@nestjs/common'
import {
	ValidationArguments,
	ValidatorConstraint,
	ValidatorConstraintInterface
} from 'class-validator'

@ValidatorConstraint({ name: 'CertificateDateValidator', async: true })
@Injectable()
export class CertificateDateValidator implements ValidatorConstraintInterface {
	constructor(private prisma: PrismaService) {}

	async validate(startDate: Date, args: ValidationArguments) {
		const input = args.object as CertificateInput

		if (input.finishDate <= startDate) return false

		const lastCertificate = await this.prisma.certificate.findFirst({
			orderBy: { finishDate: 'desc' }
		})

		return !lastCertificate || startDate >= lastCertificate.finishDate
	}

	defaultMessage(args: ValidationArguments) {
		const input = args.object as CertificateInput
		if (input.finishDate <= input.startDate)
			return 'Finish date must be greater than start date'

		return 'Start date must be after finish date of previous certificate'
	}
}
