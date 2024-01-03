import { 
	Entity, 
	Column,
	ManyToOne,
	JoinColumn
} from 'typeorm';

import { ParentEntity } from 'src/entity/parent';
import { AdminEntity } from 'src/admin/entities/admin.entity'; 

@Entity('admin_refresh_token')
export class AdminAuthEntity extends ParentEntity {
	@Column({ type: 'timestamp' })
	expired_at: Date;

	@ManyToOne(() => AdminEntity, (admin) => admin.refresh_tokens)
	@JoinColumn({ name: 'admin' })
	admin: AdminEntity;
}