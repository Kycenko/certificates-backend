import { PrismaService } from '@/prisma.service'
import {
	ConflictException,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { hash, verify } from 'argon2'
import { LoginInput } from './dto/login.input'
import { RegisterInput } from './dto/register.input'
import { AuthPayload } from './models/auth.payload'
@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwt: JwtService
	) {}

	async login(dto: LoginInput): Promise<AuthPayload> {
		const user = await this.prisma.user.findUnique({
			where: { login: dto.login }
		})

		if (!user) {
			throw new UnauthorizedException('User not found')
		}

		const isPasswordValid = await verify(user.password, dto.password)

		if (!isPasswordValid) {
			throw new UnauthorizedException('Invalid password')
		}

		const tokens = await this.issueTokens(user.id)

		await this.prisma.user.update({
			where: { id: user.id },
			data: { refreshToken: tokens.refreshToken }
		})

		return {
			accessToken: tokens.accessToken,
			refreshToken: tokens.refreshToken,
			user: {
				id: user.id,
				login: user.login,
				isAdmin: user.isAdmin
			}
		}
	}

	async register(user: RegisterInput): Promise<AuthPayload> {
		const oldUser = await this.prisma.user.findUnique({
			where: { login: user.login }
		})

		if (oldUser) {
			throw new ConflictException('User already exists')
		}

		const hashedPassword = await hash(user.password)

		const newUser = await this.prisma.user.create({
			data: {
				login: user.login,
				password: hashedPassword,
				isAdmin: false,
				refreshToken: ''
			}
		})

		const tokens = await this.issueTokens(newUser.id)

		await this.prisma.user.update({
			where: { id: newUser.id },
			data: { refreshToken: tokens.refreshToken }
		})

		return {
			user: newUser,
			...tokens
		}
	}

	private async issueTokens(id: string) {
		const accessToken = await this.jwt.signAsync(
			{ id },
			{
				expiresIn: '15m'
			}
		)
		const refreshToken = await this.jwt.signAsync(
			{ id },
			{
				expiresIn: '7d'
			}
		)

		return { accessToken, refreshToken }
	}

	async getNewTokens(userId: string, refreshToken: string) {
		const user = await this.prisma.user.findUnique({
			where: { id: userId }
		})

		if (!user || user.refreshToken !== refreshToken) {
			throw new UnauthorizedException('Invalid refresh token')
		}

		const tokens = await this.issueTokens(user.id)

		await this.prisma.user.update({
			where: { id: user.id },
			data: { refreshToken: tokens.refreshToken }
		})

		return tokens
	}

	async logout(id: string) {
		await this.prisma.user.update({
			where: { id },
			data: { refreshToken: '' }
		})
	}
}
