import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'node:path'

import { AppResolver } from './app.resolver'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma.module'

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			playground: false,
			plugins: [ApolloServerPluginLandingPageLocalDefault()],
			autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
			sortSchema: true
		}),
		PrismaModule,
		AuthModule
	],
	controllers: [],
	providers: [AppResolver]
})
export class AppModule {}
