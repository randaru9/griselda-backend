import { 
	Entity,
	Column,
	ManyToOne,
	JoinColumn
} from 'typeorm';

import { ParentEntity } from 'src/entity/parent';
import { AdminEntity } from 'src/admin/entities/admin.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';

@Entity('lesson')
export class LessonEntity extends ParentEntity {
    // @Column(()=> ManyToOne(() => CategoryEntity, category => category.id))
    @ManyToOne(() => CategoryEntity)
    @JoinColumn({ name: 'category' })
    category: CategoryEntity;
    @Column({ unique: true })
	name: string;
    @Column()
    description: string;
    @Column()
    image : string;
    @ManyToOne(() => AdminEntity)
	@JoinColumn({ name: 'author' })
	author: AdminEntity;
}