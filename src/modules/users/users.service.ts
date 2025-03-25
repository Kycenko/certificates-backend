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

		const isValidPassword = await verify(user.passwordHash, oldPassword)

		if (!isValidPassword) throw new UnauthorizedException('Invalid password')

		return this.prisma.user.update({
			where: { id: user.id },
			data: { passwordHash: await hash(newPassword) }
		})
	}

	async update(id: string, data: UpdateUserInput, password: string) {
		try {
			const user = await this.getById(id)

			const isPasswordValid = await verify(user.passwordHash, password)
			if (!isPasswordValid) throw new Error('Неверный пароль')

			const updatedUser = await this.prisma.user.update({
				where: { id },
				data: {
					login: data.login,
					isAdmin: data.isAdmin
				}
			})

			return updatedUser
		} catch (error) {
			console.error('Ошибка при обновлении пользователя:', error)
			throw new Error('Не удалось обновить пользователя')
		}
	}

	async remove(id: string) {
		await this.getById(id)

		await this.prisma.user.delete({
			where: { id }
		})

		return true
	}
}
