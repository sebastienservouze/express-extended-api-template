import {CarService} from "../services/car.service";
import {Controller, CrudController} from "@nerisma/express-extended";
import {Car} from "../entities/car.entity";

@Controller('/cars')
export class CarController extends CrudController<Car> {

    constructor(carService: CarService) {
        super(carService);
    }

}