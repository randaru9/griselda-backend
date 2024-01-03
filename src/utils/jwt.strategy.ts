import { 
	Inject, 
	Injectable,
	HttpStatus,
	HttpException
} from '@nestjs/common';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { AdminService } from 'src/admin/admin.service';
// import { CashierService } from 'src/user/cashier/cashier.service';

import { AdminEntity } from 'src/admin/entities/admin.entity';
// import { CashierEntity } from 'src/user/cashier/entity/cashier.entity';

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'ADMIN') {
	constructor (
		private configService: ConfigService,
		@Inject('ADMIN_SERVICE') private readonly adminService: AdminService
		) {
		super(configService.get('jwtStrategy'));
	}

	async validate (payload: any): Promise<AdminEntity> {
		const admin: AdminEntity | null = await this.adminService.getAdminById(payload.sub);

		if (admin) {
			return admin;
		}

		throw new HttpException('Admin tidak ditemukan', HttpStatus.UNAUTHORIZED);
	}
}

// @Injectable()
// export class CashierJwtStrategy extends PassportStrategy(Strategy, 'CASHIER') {
// 	constructor (
// 		private configService: ConfigService,
// 		@Inject('CASHIER_SERVICE') private readonly cashierService: CashierService
// 		) {
// 		super(configService.get('jwtStrategy'));
// 	}

// 	async validate (payload: any): Promise<CashierEntity> {
// 		const cashier: CashierEntity | null = await this.cashierService.getCashierById(payload.sub);

// 		if (cashier) {
// 			return cashier;
// 		}

// 		throw new HttpException('Kasir tidak ditemukan', HttpStatus.UNAUTHORIZED);
// 	}
// }