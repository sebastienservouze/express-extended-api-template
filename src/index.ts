import "reflect-metadata";
import {expressExtended} from "@nerisma/express-extended";
import {CarController} from "./controllers/car.controller";
import {logger} from "./logger/Logger";
import {LoggerMiddleware} from "./middleware/Logger.middleware";
import dotenv from "dotenv";
import {DatasourceConfig} from "./db/Datasource.config";
import {DataSource} from "typeorm";

dotenv.config();

logger.info('------------------------------');

async function server() {
    const app = expressExtended();

    // Data source setup
    const config = DatasourceConfig.getDataSourceConfig();
    const dataSource: DataSource = await app.useDataSource(config);
    logger.info(`Datasource initialized with ${dataSource.entityMetadatas.length} entities:\n* ${dataSource.entityMetadatas.map(em => em.name).join('\n* ')}`);

    // Log all requests
    app.use(LoggerMiddleware.logResponse);
    app.use(LoggerMiddleware.logError);

    // Register controllers
    const controllers = app.useControllers([
        CarController,
    ]);
    logger.info(`Controllers registered with ${controllers.length} routes:\n* ${controllers.map(c => c.path).join('\n* ')}`);

    // Start the server
    app.listen(3000, async () => {
        logger.info('Server is running on port 3000');
        logger.info('------------------------------');
    });
}

server().catch(logger.error);