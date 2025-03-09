import { getJwtConfig } from '@/config/jwt.config'
import { PrismaService } from '@/prisma.service'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'

@Module({
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		})
	],
	providers: [AuthResolver, AuthService, PrismaService]
})
export class AuthModule {}
