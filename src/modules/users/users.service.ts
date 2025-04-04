import { PrismaService } from '@/core/prisma/prisma.service'
import { ConflictException, Injectable } from '@nestjs/common'
import { UpdateUserInput } from './inputs/update-user.input'

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	async update(id: string, updateDto: UpdateUserInput) {
		const user = await this.getById(id)

		if (!user) throw new ConflictException('User not found')

		return this.prisma.user.update({
			where: { id },
			data: updateDto
		})
	}

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
