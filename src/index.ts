import "reflect-metadata";
import {expressExtended} from "@nerisma/express-extended";
import {CarController} from "./controllers/car.controller";
import {logger} from "./logger/Logger";
import {LoggerMiddleware} from "./middleware/Logger.middleware";
import dotenv from "dotenv";
import {DatasourceConfig} from "./db/Datasource.config";

dotenv.config();

async function server() {
    const app = expressExtended();
    app.set('trust proxy', true);
    app.useLogger(logger);

    // Data source setup
    const config = DatasourceConfig.getDataSourceConfig();
    logger.info('Data source config loaded', config);
    await app.useDataSource(config);

    // Log all requests
    app.use(LoggerMiddleware.logResponse);
    app.use(LoggerMiddleware.logError);

    // Register controllers
    app.useControllers([
        CarController,
    ]);

    // Start the server
    app.listen(3000, async () => {
        logger.info('Server is running on port 3000');
    });
}

server().catch(logger.error);