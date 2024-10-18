import {DataSource, DataSourceOptions} from "typeorm";
import * as dotenv from 'dotenv';
import {logger} from "../logger/Logger";

if (dotenv.config().error) {
    logger.warn('No environment variables found. Using SQLite in-mem database.')
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
    entities: [__dirname + '../../**/*.entity.{js,ts}'],
    migrations: [__dirname + '/migrations/*.{js,ts}'],
}

export const Datasource = new DataSource(options);