import { PrismaService } from '@/core/prisma/prisma.service'
import {
	ConflictException,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { hash, verify } from 'argon2'
import { UsersService } from '../users/users.service'
import { LoginInput } from './inputs/login.input'
import { RegisterInput } from './inputs/register.input'
import { AuthModel } from './models/auth.model'

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly usersService: UsersService,
		private readonly jwt: JwtService
	) {}

	async login(dto: LoginInput): Promise<AuthModel> {
		const user = await this.usersService.getByLogin(dto.login)
		if (!user) {
			throw new UnauthorizedException('Invalid login or password')
		}

		await this.verifyPassword(dto.password, user.passwordHash)

		const tokens = await this.issueAndStoreTokens(user.id)
		await this.updateLastLogin(user.id)

		return this.buildAuthModel(user, tokens)
	}

	async register(dto: RegisterInput): Promise<AuthModel> {
		const existingUser = await this.prisma.user.findUnique({
			where: { login: dto.login }
		})

		if (existingUser) {
			throw new ConflictException('User already exists')
		}

		const newUser = await this.prisma.user.create({
			data: {
				login: dto.login,
				passwordHash: await hash(dto.password),
				isAdmin: dto.isAdmin
			}
		})

		const tokens = await this.issueAndStoreTokens(newUser.id)

		return this.buildAuthModel(newUser, tokens)
	}

	async getNewTokens(
		id: string,
		refreshToken: string
	): Promise<{
		accessToken: string
		refreshToken: string
	}> {
		const user = await this.usersService.getById(id)

		if (
			!user ||
			!user.refreshToken ||
			!(await verify(user.refreshToken, refreshToken))
		) {
			throw new UnauthorizedException('Invalid refresh token')
		}

		const tokens = await this.issueAndStoreTokens(user.id)
		await this.updateLastLogin(user.id)

		return tokens
	}

	async logout(id: string): Promise<boolean> {
		await this.updateRefreshToken(id, null)
		return true
	}

	private async issueTokens(id: string) {
		return {
			accessToken: await this.jwt.signAsync({ id }, { expiresIn: '15m' }),
			refreshToken: await this.jwt.signAsync({ id }, { expiresIn: '7d' })
		}
	}

	private async issueAndStoreTokens(userId: string) {
		const tokens = await this.issueTokens(userId)
		await this.updateRefreshToken(userId, tokens.refreshToken)
		return tokens
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

	private async verifyPassword(
		inputPassword: string,
		storedPasswordHash: string
	) {
		const isMatch = await verify(storedPasswordHash, inputPassword)
		if (!isMatch) {
			throw new UnauthorizedException('Invalid login or password')
		}
	}

	private buildAuthModel(
		user: User,
		tokens: { accessToken: string; refreshToken: string }
	): AuthModel {
		return {
			accessToken: tokens.accessToken,
			refreshToken: tokens.refreshToken,
			user: {
				id: user.id,
				login: user.login,
				isAdmin: user.isAdmin,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt
			}
		}
	}
}
