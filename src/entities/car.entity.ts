import {Column, Entity} from "typeorm";
import {MetadataEntity} from "@nerisma/express-api";

@Entity()
export class Car extends MetadataEntity {

    @Column()
    model!: string;

    @Column()
    wheels!: number;

    @Column({type: 'timestamptz'})
    releaseDate!: Date;

}