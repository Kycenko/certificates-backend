import { PrismaService } from '@/core/prisma/prisma.service'
import { ConflictException, Injectable } from '@nestjs/common'
import { UpdateAdminInput } from './inputs/update-admin.input'
import { UpdateCuratorInput } from './inputs/update-curator.input'

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	async updateAdmin(id: string, updateDto: UpdateAdminInput) {
		await this.getById(id)

		return this.prisma.user.update({
			where: { id },
			data: {
				...updateDto,
				role: 'ADMIN'
			}
		})
	}

	async updateCurator(id: string, updateDto: UpdateCuratorInput) {
		await this.getById(id)

		return this.prisma.user.update({
			where: { id },
			data: {
				...updateDto,
				role: 'CURATOR'
			}
		})
	}

	async updateCuratorFullName(id: string, fullName: string) {
		await this.getById(id)

		return this.prisma.user.update({
			where: { id },
			data: {
				curators: {
					update: {
						where: { id },
						data: { fullName }
					}
				}
			}
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
			where: { login },
			include: {
				curators: {
					include: { group: true }
				}
			}
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
