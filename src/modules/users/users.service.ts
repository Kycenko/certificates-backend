import { PrismaService } from '@/core/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { hash, verify } from 'argon2'
import { UpdateUserInput } from './dto/update-user.input'

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	async getUserById(id: string) {
		const user = await this.prisma.user.findUnique({
			where: { id }
		})

		if (!user) throw new Error('User not found')

		return user
	}

	async getUserByLogin(login: string) {
		const user = await this.prisma.user.findUnique({
			where: { login }
		})

		if (!user) throw new Error('User not found')

		return user
	}

	async changePassword(id: string, oldPassword: string, newPassword: string) {
		const user = await this.getUserById(id)

		const isValidPassword = await verify(user.password, oldPassword)

		if (!isValidPassword) throw new Error('Invalid password')

		return this.prisma.user.update({
			where: { id: user.id },
			data: { password: await hash(newPassword) }
		})
	}

	async updateUser(id: string, data: UpdateUserInput) {
		const user = await this.getUserById(id)

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
