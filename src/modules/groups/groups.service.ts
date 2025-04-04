import { PrismaService } from '@/core/prisma/prisma.service'
import { RedisService } from '@/core/redis/redis.service'
import { BaseService } from '@/shared/base/base.service'
import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { Group } from '@prisma/client'
import SuperJSON from 'superjson'
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

	async create(createDto: GroupInput): Promise<Group> {
		const group = await super.create(createDto)

		await this.redis.del('groups')

		return group
	}

	async update(id: string, updateDto: GroupInput): Promise<Group> {
		const group = await super.update(id, updateDto)

		await this.redis.del('groups')

		return group
	}

	async remove(id: string): Promise<boolean> {
		const result = await super.remove(id)

		await this.redis.del('groups')

		return result
	}

	async removeMany(ids: string[]): Promise<boolean> {
		const result = await super.removeMany(ids)

		await this.redis.del('groups')

		return result
	}

	async removeAll(): Promise<{ count: number }> {
		const result = await super.removeAll()

		await this.redis.del('groups')

		return result
	}

	async getAll({ params }: { params?: GroupParamsInput }) {
		try {
			this.logger.log(`Fetching groups with params: ${JSON.stringify(params)}`)

			const cachedGroups = await this.redis.get('groups')

			if (cachedGroups) {
				this.logger.log('Fetching groups from cache')
				return SuperJSON.parse(cachedGroups)
			}

			const groups = await this.prisma.group.findMany({
				where: { title: { contains: params?.title, mode: 'insensitive' } },
				orderBy: {
					title: params?.orderBy
				},
				include: {
					students: true,
					course: {
						include: { department: true }
					}
				}
			})

			if (!groups) throw new ConflictException('Groups not found')
			this.logger.log(`Found ${groups.length} groups`)

			await this.redis.set('groups', SuperJSON.stringify(groups), 60)

			return groups
		} catch (error) {
			this.logger.error(`Error fetching groups: ${error.message}`, error.stack)
			throw error
		}
	}

	async getById(id: string) {
		try {
			this.logger.log(`Fetching group by ID: ${id}`)

			const group = await this.prisma.group.findUnique({
				where: { id },
				include: {
					course: {
						include: { department: true }
					},
					students: {
						include: {
							certificates: true
						}
					}
				}
			})

			if (!group) {
				this.logger.warn(`group not found with ID: ${id}`)
				throw new NotFoundException(`group not found!`)
			}

			this.logger.log(`Successfully fetched group with ID: ${id}`)
			return group
		} catch (error) {
			this.logger.error(
				`Error fetching group by ID ${id}: ${error.message}`,
				error.stack
			)
			throw error
		}
	}

	async getByTitle(title: string) {
		const group = await this.prisma.group.findUnique({
			where: { title }
		})

		if (!group) throw new ConflictException('Group not found!')

		return group
	}
}
