import express from 'express';
import {Container, Type} from "@nerisma/di";

// List controllers & entities
import {Controllers, DataSourceUtils, MetadataEntity} from "@nerisma/express-api";
import {Car} from "./entities/car.entity";
import {CarController} from "./controllers/car.controller";

const entities: Type<MetadataEntity>[] = [Car]
const controllers: Type<any>[] = [CarController]

async function server() {
    // Setup express
    const app = express();
    app.use(express.json());

    // Initialize datasource
    const dataSource = await DataSourceUtils.getInMemoryPostgresDataSource(entities).initialize();

    // Inject it
    Container.inject(dataSource, true);

    // Bind controllers to express routes
    Controllers.use(app, controllers);

    // Start the server
    const server = app.listen(3000, async () => {
        console.log('Server is running on port 3000');

        await client();

        server.close(() => {
            console.log('Server closed');
        });
    });
}

async function client() {
    // Create a car
    await fetch('http://localhost:3000/car', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'Toyota',
            wheels: 4,
            releaseDate: new Date(),
        }),
    });

    // Consult the car
    const response = await fetch('http://localhost:3000/car/1');
    const car = await response.json();
    console.log(car);
}

server().catch(console.error);