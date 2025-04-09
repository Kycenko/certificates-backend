import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { UserRole } from '../base/base.types'

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private readonly roles: UserRole[]) {}

	canActivate(context: ExecutionContext): boolean {
		const ctx = GqlExecutionContext.create(context).getContext()
		const user = ctx.req.user

		return this.roles.includes(user.role)
	}
}
