import {DataSource, DataSourceOptions} from "typeorm";
import * as dotenv from 'dotenv';
import {logger} from "../logger/Logger";

if (dotenv.config().error) {
    logger.warn('No environment variables found. Using SQLite in-mem database.')
}

let entities;
if (process.env.NODE_ENV === 'prod') {
    entities = [__dirname + '/../../**/*.entity.js'];
} else {
    entities = [__dirname + '../../**/*.entity.ts'];
}

const options: DataSourceOptions = {
    type: (process.env.DB_TYPE ?? 'sqlite') as any,
    host: process.env.DB_HOST ?? undefined,
    port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
    username: process.env.DB_USER ?? undefined,
    password: process.env.DB_PASSWORD ?? undefined,
    database: process.env.DB_NAME ?? 'sqlite.db',
    synchronize: false,
    logging: false,
    entities: entities,
    migrations: [__dirname + '/migrations/*.{js,ts}'],
}

logger.debug(`Datasource options: ${JSON.stringify(options)}`);

export const Datasource = new DataSource(options);