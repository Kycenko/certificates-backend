import { PrismaService } from '@/core/prisma/prisma.service'
import { ConflictException, Injectable } from '@nestjs/common'

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

	async remove(id: string) {
		await this.getById(id)

		const deletedUser = await this.prisma.user.delete({
			where: { id }
		})
		if (!deletedUser) return false

		return true
	}
}
