import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class RegisterInput {
	@Field(() => String)
	login: string

	@Field(() => String)
	password: string

	@Field(() => Boolean)
	isAdmin: boolean
}
