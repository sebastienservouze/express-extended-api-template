import {Column, Entity} from "typeorm";
import {AuthRole} from "../enums/AuthRole.enum";
import {MetadataEntity} from "../../../express-api/src/db/MetadataEntity";

@Entity()
export class AuthUser extends MetadataEntity {

    @Column()
    username!: string;

    @Column()
    password!: string;

    @Column({default: AuthRole.GUEST})
    role!: string;

}