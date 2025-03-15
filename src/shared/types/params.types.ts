export type OrderByParams = {
	orderBy: 'asc' | 'desc'
}

type PaginationParams = {
	page: number
	limit: number
}

export type DepartmentParams = {
	title?: string
} & OrderByParams

export type CourseParams = {
	departmentTitle?: string
} & OrderByParams

export type GroupParams = {
	title?: string
	departmentTitle?: string
} & OrderByParams

export type HealthGroupParams = {
	title?: string
} & OrderByParams

export type PhysicalEducationParams = {
	title?: string
} & OrderByParams

export type StudentParams = {
	lastName?: string
	departmentTitle?: string
	courseNumber?: number
	groupTitle?: string
	isExpelled?: boolean
} & OrderByParams &
	PaginationParams
