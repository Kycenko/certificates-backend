import { getJwtConfig } from '@/shared/config/jwt.config'
import { JwtStrategy } from '@/shared/strategies/jwt.strategy'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UsersService } from '../users/users.service'
import { AuthResolver } from './auth.resolver'
import { AuthService } from './auth.service'

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		})
	],
	providers: [AuthResolver, AuthService, UsersService, JwtStrategy]
})
export class AuthModule {}
