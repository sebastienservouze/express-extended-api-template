import {DataSource, DataSourceOptions} from "typeorm";

export const Datasource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    synchronize: false,
    logging: false,
    entities: [__dirname + '../../**/*.entity.{js,ts}'],
    migrations: [__dirname + '../../**/*.migration.{js,ts}'],
})