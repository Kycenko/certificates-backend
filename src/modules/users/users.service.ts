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

	async updateCuratorDisplayedName(id: string, displayedName: string) {
		await this.getById(id)

		return this.prisma.user.update({
			where: { id },
			data: {
				curator: {
					update: {
						where: { id },
						data: { displayedName }
					}
				}
			}
		})
	}

	async getAllCurators() {
		return this.prisma.user.findMany({
			where: { role: 'CURATOR' },
			include: {
				curator: {
					include: { group: true }
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
				curator: {
					include: { group: true }
				}
			}
		})

		if (!user) throw new ConflictException('User not found')

		return user
	}

	async removeCurator(id: string) {
		await this.getById(id)

		const deletedCurator = await this.prisma.user.delete({
			where: { id, role: 'CURATOR' }
		})
		if (!deletedCurator) return false

		return true
	}

	async removeManyCurators(ids: string[]) {
		const deletedCurators = await this.prisma.user.deleteMany({
			where: { id: { in: ids }, role: 'CURATOR' }
		})
		if (!deletedCurators) return false

		return true
	}

	async removeAllCurators() {
		const deletedCurators = await this.prisma.user.deleteMany({
			where: { role: 'CURATOR' }
		})
		if (!deletedCurators) return false

		return true
	}
}
