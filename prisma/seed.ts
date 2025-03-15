import { PrismaClient } from '@prisma/client'
import { hash } from 'argon2'
const prisma = new PrismaClient()
async function main() {
	await prisma.user.create({
		data: {
			login: 'testuser',
			passwordHash: await hash('testuser'),
			isAdmin: true
		}
	})

	await prisma.department.createMany({
		data: [
			{
				title: 'ПОИТ'
			},
			{
				title: 'Экономическое'
			},
			{
				title: 'Юридическое'
			}
		]
	})

	await prisma.healthGroup.createMany({
		data: [
			{
				title: '1-я группа'
			},
			{
				title: '2-я группа'
			},
			{
				title: '3-я группа'
			},
			{
				title: '4-я группа'
			},
			{
				title: '5-я группа'
			}
		]
	})

	await prisma.physicalEducation.createMany({
		data: [
			{
				title: 'ЛФК'
			},
			{
				title: 'Основная'
			},
			{
				title: 'Подготовительная'
			},
			{
				title: 'СМГ'
			}
		]
	})
}
main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
