import {DataSourceOptions} from "typeorm";

export abstract class DatasourceConfig {

    public static getDataSourceConfig(): DataSourceOptions {
        if (process.env.NODE_ENV === 'prod') {
            return {
                type: process.env.DATABASE_TYPE as any,
                url: process.env.DATABASE_URL,
                synchronize: false,
                logging: false,
                entities: [__dirname + '../**/*.entity.{js,ts}'],
            }
        }

        return {
            type: 'sqlite',
            database: 'database.sqlite',
            synchronize: true,
            entities: [__dirname + '/../**/*.entity.{js,ts}'],
        };
    }
}