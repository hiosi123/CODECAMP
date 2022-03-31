import { Entity, Column} from 'typeorm'

@Entity()
export class Board {
    @Column()
    number: number;
    
    @Column()
    writer: string; 

    @Column() 
    title: string;

    @Column()
    contents:string;
}