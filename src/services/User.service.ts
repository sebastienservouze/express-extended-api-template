import {CrudService} from "@nerisma/express-extended";
import {User} from "../entities/User.entity";
import {Dependency} from "@nerisma/di";
import {DataSource} from "typeorm";

@Dependency()
export class UserService extends CrudService<User> {
    
    constructor(dataSource: DataSource) {
        super(dataSource, User);
    }
}