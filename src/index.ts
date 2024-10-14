import "reflect-metadata";
import {expressExtended} from "@nerisma/express-extended";
import {CarController} from "./controllers/car.controller";
import {Container} from "../../di";

async function server() {
    const app = expressExtended();

    app.useLogger(console);

    // Load datasource options from config file which is in a sibling directory
    await app.useDataSource({
        type: 'sqlite',
        database: ':memory:',
        synchronize: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
    });

    app.use((req, res, next) => {
        console.log('Request:', req.method, req.url);
        next();
    });

    app.useControllers([
        CarController,
    ]);

    app.listen(3000, async () => {
        console.log('Server is running on port 3000');
    });
}

server().catch(console.error);