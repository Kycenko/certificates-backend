import { PrismaService } from '@/core/prisma/prisma.service'
import { RedisService } from '@/core/redis/redis.service'
import { BaseService } from '@/shared/base/base.service'
import { ConflictException, Injectable } from '@nestjs/common'
import { Group } from '@prisma/client'
import { GroupInput } from './inputs/group.input'
import { GroupParamsInput } from './inputs/group.params.input'

@Injectable()
export class GroupsService extends BaseService<Group, GroupInput> {
	constructor(
		private readonly prisma: PrismaService,
		private readonly redis: RedisService
	) {
		super(prisma, 'Group')
	}

	async getAll({ params }: { params: GroupParamsInput }) {
		const cachedGroups = await this.redis.get('groups')

		if (cachedGroups) return JSON.parse(cachedGroups)

		const groups = await this.prisma.group.findMany({
			where: { title: { contains: params.title, mode: 'insensitive' } },
			orderBy: {
				title: params.orderBy
			}
		})

		await this.redis.set('groups', JSON.stringify(groups), 60)

		return groups
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
