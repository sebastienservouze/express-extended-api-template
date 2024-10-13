import {Controller, CrudController} from "@nerisma/express-api";
import {Car} from "../entities/car.entity";
import {CarService} from "../services/car.service";

@Controller('/car')
export class CarController extends CrudController<Car> {

    constructor(carService: CarService) {
        super(carService);
    }

}