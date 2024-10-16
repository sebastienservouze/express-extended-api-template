import {CarService} from "../services/Car.service";
import {Controller, CrudController} from "@nerisma/express-extended";
import {Car} from "../entities/Car.entity";
import {AuthMiddleware} from "../middleware/Auth.middleware";

@Controller('/cars', AuthMiddleware.authenticate())
export class CarController extends CrudController<Car> {

    constructor(carService: CarService) {
        super(carService);
    }
}