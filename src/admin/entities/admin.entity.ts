import { 
	Entity, 
	Column,
	OneToMany
} from 'typeorm';

import { comparePassword } from 'src/utils';
import { ParentEntity } from 'src/entity/parent';
import { AdminAuthEntity } from 'src/auth/entities/auth.entity';

export enum AdminRole {
	ADMIN = 'AANG',
	SUPERADMIN = 'OPM',
}

@Entity('admin')
export class AdminEntity extends ParentEntity {
	@Column()
	salt: string;

	@Column()
	username: string;

	@Column()
	password: string;

	@Column({ type: 'text' })
	image: string;

	@Column({ unique: true })
	email: string;

	@Column({ type: 'char', length: 6, nullable: true })
	otp: string;

	@Column({ type: 'enum', enum: AdminRole, default: AdminRole.ADMIN })
	role: AdminRole;

	@OneToMany(() => AdminAuthEntity, (auth) => auth.admin)
	refresh_tokens: AdminAuthEntity[];

	async validatePassword (password: string) {
		return await comparePassword(password, this.password, this.salt);
	}
}