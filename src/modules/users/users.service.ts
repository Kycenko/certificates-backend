import { PrismaService } from '@/core/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { hash } from 'argon2'
import { UpdateUserInput } from './dto/update-user.input'

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	async getUser(id: string) {
		const user = await this.prisma.user.findUnique({
			where: { id }
		})

		if (!user) throw new Error('User not found')

		return user
	}

	async updateUser(id: string, data: UpdateUserInput) {
		const user = await this.getUser(id)

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
