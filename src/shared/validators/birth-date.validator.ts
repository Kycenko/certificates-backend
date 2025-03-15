import {
	ValidatorConstraint,
	ValidatorConstraintInterface
} from 'class-validator'

@ValidatorConstraint({ async: true })
export class BirthDateValidator implements ValidatorConstraintInterface {
	async validate(birthDate: Date) {
		return birthDate.getTime() <= new Date().getTime()
	}

	defaultMessage() {
		return `Birth date must be less than current date`
	}
}
