import { PrismaService } from '@/core/prisma/prisma.service'
import {
	ConflictException,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { hash, verify } from 'argon2'
import { UpdateUserInput } from './inputs/update-user.input'

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	async getById(id: string) {
		const user = await this.prisma.user.findUnique({
			where: { id }
		})

		if (!user) throw new ConflictException('User not found')

		return user
	}

	async getByLogin(login: string) {
		const user = await this.prisma.user.findUnique({
			where: { login }
		})

		if (!user) throw new ConflictException('User not found')

		return user
	}

	async changePassword(id: string, oldPassword: string, newPassword: string) {
		const user = await this.getById(id)

		const isValidPassword = await verify(user.password, oldPassword)

		if (!isValidPassword) throw new UnauthorizedException('Invalid password')

		return this.prisma.user.update({
			where: { id: user.id },
			data: { password: await hash(newPassword) }
		})
	}

	async update(id: string, data: UpdateUserInput) {
		const user = await this.getById(id)

		return this.prisma.user.update({
			where: { id },
			data: {
				login: data.login,
				password: data.password ? await hash(data.password) : user.password,
				isAdmin: data.isAdmin
			}
		})
	}
}
