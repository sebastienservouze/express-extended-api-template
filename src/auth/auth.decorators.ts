import 'reflect-metadata';
import {AuthRole} from "./auth-role.enum";
import {ControllerMetadataKeys} from "../../../express-api/src/controller/controller-metadata-keys.enum";

export function Secured(role: AuthRole): ClassDecorator {
    return (target) => {
        Reflect.defineMetadata(ControllerMetadataKeys.MINIMAL_ROLE, role, target);
    }
}
