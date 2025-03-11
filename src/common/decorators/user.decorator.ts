// import { createParamDecorator, ExecutionContext } from '@nestjs/common'
// import { User } from '@prisma/client'

// export const CurrentUser = createParamDecorator(
// 	(data: keyof User, ctx: ExecutionContext) => {
// 		const request = ctx.switchToHttp().getRequest()
// 		const user = request.user

// 		return data ? user[data] : user
// 	}
// )

import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const CurrentUser = createParamDecorator(
	(data: unknown, context: ExecutionContext) => {
		const ctx = GqlExecutionContext.create(context)
		return ctx.getContext().req.user
	}
)
