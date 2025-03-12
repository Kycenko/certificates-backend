import { AuthModule } from '@/modules/auth/auth.module'
import { DepartmentsModule } from '@/modules/departments/departments.module'
import { GroupsModule } from '@/modules/groups/groups.module'
import { UsersModule } from '@/modules/users/users.module'
import { IS_DEV_ENV } from '@/shared/utils/is-dev'
import { ApolloDriver } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { getGraphqlConfig } from './config/graphql.config'
import { PrismaModule } from './prisma/prisma.module'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, ignoreEnvFile: !IS_DEV_ENV }),
		GraphQLModule.forRootAsync({
			driver: ApolloDriver,
			useFactory: getGraphqlConfig,
			imports: [ConfigModule],
			inject: [ConfigService]
		}),
		AuthModule,
		UsersModule,
		DepartmentsModule,
		GroupsModule,
		PrismaModule
	]
})
export class AppModule {}
