// export class Count {}
import { 
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn
} from 'typeorm';

@Entity('count')
export class CountEntity {
	@PrimaryGeneratedColumn()
	id: string;
	@Column({default: 0})
    name: string;
    @Column({default: 0})
	value: number;
	@CreateDateColumn()
	create_at: Date;
	@UpdateDateColumn()
	update_at: Date;
	@DeleteDateColumn()
	delete_at: Date;
}