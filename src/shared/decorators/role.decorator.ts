import { applyDecorators, UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../guards/gql-auth.guard'
import { RoleGuard } from '../guards/role.guard'

export const AuthRole = (role: 'admin' | 'user' = 'user') => {
	return applyDecorators(UseGuards(GqlAuthGuard, new RoleGuard(role)))
}
