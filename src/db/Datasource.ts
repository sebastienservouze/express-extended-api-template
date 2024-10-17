import {DataSource, DataSourceOptions} from "typeorm";
import * as dotenv from 'dotenv';
dotenv.config();

const options: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT!,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    entities: [__dirname + '../../**/*.entity.{js,ts}'],
    migrations: [__dirname + '/migrations/*.{js,ts}'],
}

console.log(options);
export const Datasource = new DataSource(options);