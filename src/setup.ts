import express from "express";
import {DataSource} from "typeorm";
import {logger} from "./logger/Logger";
import {LoggerMiddleware} from "./middleware/Logger.middleware";
import {AuthController} from "./controllers/Auth.controller";
import {Datasource} from "./db/Datasource";

export async function setupDatasource(app: express.Application) {
    const datasource: DataSource = await app.useDataSource(Datasource.options);
    
    logger.debug(`Datasource initialized with ${datasource.entityMetadatas.length} entities`);

    datasource.entityMetadatas.forEach(entity => logger.debug(`${entity.name}`));
}

export function setupMiddlewares(app: express.Application) {
    app.use(LoggerMiddleware.logResponse);
    app.use(LoggerMiddleware.logError);
}

export function setupControllers(app: express.Application) {
    const controllers = [
        AuthController,
    ];

    const endpoints = app.useControllers(controllers);
    logger.debug(`Controllers registered with ${controllers.length} routes`);
    endpoints.forEach(endpoint => logger.debug(`[${endpoint.verb}] ${endpoint.path}`));
}