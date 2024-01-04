// export class Count {}
import { 
	Entity,
	Column,
	PrimaryGeneratedColumn
} from 'typeorm';

@Entity('count')
export class CountEntity {
	@PrimaryGeneratedColumn()
	id: string;
	@Column({default: 0})
    name: string;
    @Column({default: 0})
	value: number;
}