import "reflect-metadata";
import dotenv from "dotenv";
import {expressExtended} from "@nerisma/express-extended";

dotenv.config();
import {logger} from "./logger/Logger";
import {setupControllers, setupDatasource, setupMiddlewares} from "./setup";

async function server() {
    const app = expressExtended();

    await setupDatasource(app);
    setupMiddlewares(app);
    setupControllers(app);

    // Start the server
    app.listen(process.env.SERVER_PORT ?? 3000, async () => {
        logger.info('==============================');
        logger.info(`Server is running on port ${process.env.SERVER_PORT ?? 3000}`);
        logger.info('==============================');
    });
}

server().catch(logger.error);