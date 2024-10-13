import {CrudService} from "@nerisma/express-api";
import {Car} from "../entities/car.entity";
import {Dependency} from "@nerisma/di";
import {DataSource} from "typeorm";

@Dependency()
export class CarService extends CrudService<Car> {

    constructor(dataSource: DataSource) {
        super(dataSource.getRepository(Car));
    }

}