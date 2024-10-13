import {CarService} from "../services/car.service";
import {AuthRole, Controller, CrudController} from "@nerisma/express-extended";
import {Car} from "../entities/car.entity";
import {Secured} from "../../../express-api/src/service/auth/auth.decorators";

@Controller('/cars')
@Secured(AuthRole.USER)
export class CarController extends CrudController<Car> {

    constructor(carService: CarService) {
        super(carService);
    }

}