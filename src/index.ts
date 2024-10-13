import "reflect-metadata";
import {AuthController, AuthUser, expressExtended} from "@nerisma/express-extended";
import {CarController} from "./controllers/car.controller";
import {Container} from "@nerisma/di";

async function server() {
    const app = expressExtended();

    // Load datasource options from config file which is in a sibling directory
    const dataSource = await app.useDataSource({
        type: 'sqlite',
        database: ':memory:',
        synchronize: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}', AuthUser],
    });

    Container.inject(dataSource, true);
    Container.resolve(CarController);

    app.useControllers([
        CarController,
        AuthController
    ]);

    app.listen(3000, async () => {
        console.log('Server is running on port 3000');

        app.use((req, res, next) => {
            console.log('Request:', req.method, req.url);
            next();
        })

        fetch ('http://localhost:3000/cars').then(response => response.json()).then(data => {
            console.log('Cars:', data);
        }, error => {
            console.error('Error:', error);
        });
    });
}

server().catch(console.error);