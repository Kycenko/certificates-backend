import { PrismaService } from '@/core/prisma/prisma.service'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'

import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private configService: ConfigService,
		private prisma: PrismaService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: configService.get('JWT_SECRET') || process.env.JWT_SECRET
		})
	}

	async validate(payload: { id: string; iat: number; exp: number }) {
		if (!payload.id) throw new UnauthorizedException('Invalid token payload')

		const user = await this.prisma.user.findUnique({
			where: { id: payload.id }
		})

		if (!user) throw new UnauthorizedException('User not found')

		return user
	}
}
