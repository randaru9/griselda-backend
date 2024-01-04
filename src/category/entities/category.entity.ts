import { 
	Entity,
	Column,
	ManyToOne,
	JoinColumn
} from 'typeorm';

import { ParentEntity } from 'src/entity/parent';
import { AdminEntity } from 'src/admin/entities/admin.entity';

@Entity('category')
export class CategoryEntity extends ParentEntity {
	@Column({ unique: true })
	name: string;
    @ManyToOne(() => AdminEntity)
	@JoinColumn({ name: 'author' })
	author: AdminEntity;
}