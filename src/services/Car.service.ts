import {Car} from "../entities/Car.entity";
import {Dependency} from "@nerisma/di";
import {DataSource} from "typeorm";
import {CrudService} from "@nerisma/express-extended";

@Dependency()
export class CarService extends CrudService<Car> {

    constructor(dataSource: DataSource) {
        super(dataSource, Car);
    }

}