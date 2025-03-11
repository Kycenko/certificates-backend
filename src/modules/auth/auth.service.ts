import { PrismaService } from '@/core/prisma/prisma.service'
import {
	ConflictException,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { hash, verify } from 'argon2'
import { UsersService } from '../users/users.service'
import { LoginInput } from './inputs/login.input'
import { RegisterInput } from './inputs/register.input'
import { AuthPayload } from './models/auth.payload'

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly usersService: UsersService,
		private readonly jwt: JwtService
	) {}

	async login(dto: LoginInput): Promise<AuthPayload> {
		const user = await this.usersService.getUserByLogin(dto.login)
		if (!user) throw new UnauthorizedException('User not found')

		await this.verifyPassword(dto.password, user.password)

		const tokens = await this.issueTokens(user.id)
		await this.updateRefreshToken(user.id, tokens.refreshToken)
		await this.updateLastLogin(user.id)

		return this.buildAuthPayload(user, tokens)
	}

	async register(dto: RegisterInput): Promise<AuthPayload> {
		const existingUser = await this.usersService.getUserByLogin(dto.login)
		if (existingUser) throw new ConflictException('User already exists')

		const hashedPassword = await hash(dto.password)
		const newUser = await this.prisma.user.create({
			data: { login: dto.login, password: hashedPassword, isAdmin: false }
		})

		const tokens = await this.issueTokens(newUser.id)
		await this.updateRefreshToken(newUser.id, tokens.refreshToken)

		return this.buildAuthPayload(newUser, tokens)
	}

	async getNewTokens(id: string, refreshToken: string) {
		const user = await this.usersService.getUserById(id)
		if (
			!user ||
			!user.refreshToken ||
			!(await verify(user.refreshToken, refreshToken))
		)
			throw new UnauthorizedException('Invalid refresh token')

		const tokens = await this.issueTokens(user.id)
		await this.updateRefreshToken(user.id, tokens.refreshToken)

		return tokens
	}

	async logout(id: string) {
		await this.updateRefreshToken(id, null)
	}

	private async issueTokens(id: string) {
		return {
			accessToken: await this.jwt.signAsync({ id }, { expiresIn: '15m' }),
			refreshToken: await this.jwt.signAsync({ id }, { expiresIn: '7d' })
		}
	}

	private async updateRefreshToken(id: string, refreshToken: string | null) {
		const hashedToken = refreshToken ? await hash(refreshToken) : null
		await this.prisma.user.update({
			where: { id },
			data: { refreshToken: hashedToken }
		})
	}

	private async updateLastLogin(id: string) {
		await this.prisma.user.update({
			where: { id },
			data: { lastLoginAt: new Date() }
		})
	}

	private async verifyPassword(inputPassword: string, storedPassword: string) {
		if (!(await verify(storedPassword, inputPassword)))
			throw new UnauthorizedException('Invalid password')
	}

	private buildAuthPayload(user: any, tokens: any): AuthPayload {
		return {
			accessToken: tokens.accessToken,
			refreshToken: tokens.refreshToken,
			user: { id: user.id, login: user.login, isAdmin: user.isAdmin }
		}
	}
}
