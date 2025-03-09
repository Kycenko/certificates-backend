import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'node:path'
import { AppController } from './app.controller'
import { AppService } from './app.service'

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
		PrismaModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
