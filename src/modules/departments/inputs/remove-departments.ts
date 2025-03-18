import { ArgsType, Field } from '@nestjs/graphql'

@ArgsType()
export class RemoveManyDepartmentsArgs {
	@Field(() => [String])
	ids: string[]
}
