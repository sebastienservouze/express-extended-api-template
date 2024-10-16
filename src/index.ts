import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import {expressExtended} from "@nerisma/express-extended";
import {logger} from "./logger/Logger";
import {CarController} from "./controllers/Car.controller";
import {LoggerMiddleware} from "./middleware/Logger.middleware";
import {DatasourceConfig} from "./db/Datasource.config";
import {DataSource} from "typeorm";
import {AuthController} from "./controllers/Auth.controller";
import {AuthUser} from "./entities/AuthUser.entity";
import {AuthRole} from "./enums/AuthRole.enum";


async function server() {
    const app = expressExtended();

    // Data source setup
    const config = DatasourceConfig.getDataSourceConfig();
    const dataSource: DataSource = await app.useDataSource(config);
    logger.debug(`Datasource initialized with ${dataSource.entityMetadatas.length} entities`);
    dataSource.entityMetadatas.forEach(entity => logger.debug(`${entity.name}`));
    await dataSource.getRepository<AuthUser>(AuthUser).save({
        username: 'username',
        password: 'password',
        role: AuthRole.ADMIN
    })
    logger.debug('------------------------------');

    // Middleware setup
    app.use(LoggerMiddleware.logResponse);
    app.use(LoggerMiddleware.logError);

    // Register controllers
    const controllers = [
        CarController,
        AuthController,
    ];
    const endpoints = app.useControllers(controllers);
    logger.debug(`Controllers registered with ${controllers.length} routes`);
    endpoints.forEach(endpoint => logger.debug(`[${endpoint.verb}] ${endpoint.path}`));

    // Start the server
    app.listen(3000, async () => {
        logger.info('==============================');
        logger.info('Server is running on port 3000');
        logger.info('==============================');
    });
}

server().catch(logger.error);