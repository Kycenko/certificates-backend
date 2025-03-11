import { applyDecorators, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { RoleGuard } from '../guards/role.guard'

export const AuthRole = (role: 'admin' | 'user' = 'user') => {
	applyDecorators(
		role === 'admin' ? UseGuards(AuthGuard('jwt'), RoleGuard) : UseGuards()
	)
}
