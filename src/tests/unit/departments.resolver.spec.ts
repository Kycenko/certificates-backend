import { DepartmentsResolver } from '@/modules/departments/departments.resolver'
import { DepartmentsService } from '@/modules/departments/departments.service'
import { Test } from '@nestjs/testing'
import { Department } from '@prisma/client'

describe('DepartmentsResolver', () => {
	let resolver: DepartmentsResolver
	let service: DepartmentsService

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			providers: [
				DepartmentsResolver,
				{
					provide: DepartmentsService,
					useValue: {
						getById: jest.fn(),
						create: jest.fn()
					}
				}
			]
		}).compile()

		resolver = moduleRef.get<DepartmentsResolver>(DepartmentsResolver)
		service = moduleRef.get<DepartmentsService>(DepartmentsService)
	})

	describe('createDepartment', () => {
		it('should create a new department', async () => {
			const mockDepartment = {
				id: '1',
				title: 'test',
				createdAt: new Date(),
				updatedAt: new Date()
			} as Department
			jest.spyOn(service, 'create').mockResolvedValue(mockDepartment)

			const result = await resolver.create({
				title: 'test'
			})

			expect(result).toEqual(mockDepartment)

			expect(service.create).toHaveBeenCalledWith({
				title: 'test'
			})
		})
	})

	describe('getDepartmentById', () => {
		it('should return a department', async () => {
			const mockDepartment = {
				id: '1',
				title: 'test',
				createdAt: new Date(),
				updatedAt: new Date()
			} as Department
			jest.spyOn(service, 'getById').mockResolvedValue(mockDepartment)

			const result = await resolver.getById('1')
			expect(result).toEqual(mockDepartment)

			expect(service.getById).toHaveBeenCalledWith('1')
		})
	})
})
