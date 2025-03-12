import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ApolloDriverConfig } from '@nestjs/apollo'
import { ConfigService } from '@nestjs/config'
import { join } from 'path'

export function getGraphqlConfig(
	configService: ConfigService
): ApolloDriverConfig {
	return {
		playground: false,
		path: configService.getOrThrow<string>('GRAPHQL_PATH'),
		plugins: [ApolloServerPluginLandingPageLocalDefault()],
		autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
		sortSchema: true,
		context: ({ req }) => ({ req })
	}
}
