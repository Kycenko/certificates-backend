import { ArgsType, Field } from '@nestjs/graphql'

@ArgsType()
export class RemoveManyInput {
	@Field(() => [String])
	ids: string[]
}
