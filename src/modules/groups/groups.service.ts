import { PrismaService } from '@/core/prisma/prisma.service'
import { BaseService } from '@/shared/base/base.service'
import { ConflictException, Injectable } from '@nestjs/common'
import { Group } from '@prisma/client'
import { GroupInput } from './inputs/group.input'

@Injectable()
export class GroupsService extends BaseService<Group, GroupInput> {
	constructor(private readonly prisma: PrismaService) {
		super(prisma, 'Group')
	}

	async getAll(title?: string, orderBy: 'asc' | 'desc' = 'asc') {
		return await this.prisma.group.findMany({
			where: { title: { contains: title, mode: 'insensitive' } },
			orderBy: {
				title: orderBy
			}
		})
	}

	async getById(id: string) {
		const group = await this.prisma.group.findUnique({
			where: { id }
		})

		if (!group) throw new ConflictException('Group not found!')

		return group
	}

	async getByTitle(title: string) {
		const group = await this.prisma.group.findUnique({
			where: { title }
		})

		if (!group) throw new ConflictException('Group not found!')

		return group
	}
}
