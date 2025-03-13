import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private readonly requiredRole: 'admin' | 'user') {}

	canActivate(context: ExecutionContext): boolean {
		const ctx = GqlExecutionContext.create(context)
		const user = ctx.getContext().req.user

		if (!user) throw new UnauthorizedException('User not found')

		if (this.requiredRole === 'admin' && !user.isAdmin) {
			throw new ForbiddenException('User is not an admin!')
		}

		return true
	}
}
