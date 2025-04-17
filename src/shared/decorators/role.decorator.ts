import { applyDecorators, UseGuards } from '@nestjs/common'
import { UserRole } from '../base/base.types'
import { GqlAuthGuard } from '../guards/gql-auth.guard'
import { RoleGuard } from '../guards/role.guard'

export const AuthRole = (...roles: UserRole[]) => {
	return applyDecorators(UseGuards(GqlAuthGuard, new RoleGuard(roles)))
}
