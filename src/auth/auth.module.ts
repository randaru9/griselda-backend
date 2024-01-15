import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { AdminJwtStrategy } from 'src/utils';
// import { AdminAuthService } from './admin-auth.service';
import { AuthService } from './auth.service';
import { AdminModule } from 'src/admin/admin.module';
import { JwtConfigService } from 'src/config';
import { AdminAuthEntity } from './entities/auth.entity';
import { AuthController } from './auth.controller';
import { MailerConfig } from 'src/utils/MailerConfig';

const imports = [
	AdminModule,
	TypeOrmModule.forFeature([AdminAuthEntity]),
	JwtModule.registerAsync({ imports: [ConfigModule], useClass: JwtConfigService }),
	MailerModule.forRootAsync({ 
		imports: [ConfigModule],
		useClass: MailerConfig
	}),
];
const providers = [
	{
		provide: 'AUTH_ADMIN_SERVICE',
		useClass: AuthService
	},
	{
		provide: 'ADMIN_JWT_STRATEGY',
		useClass: AdminJwtStrategy
	}
];
const controllers = [AuthController];

@Module({
	imports,
	providers,
	controllers
})
export class AuthModule { }
