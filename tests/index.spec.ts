import {expressExtended} from "@nerisma/express-extended";
import {AuthController} from "../src/controllers/Auth.controller";
import express from "express";
import * as Http from "node:http";

describe('index', () => {

    let app: express.Application;
    let server: Http.Server;

    beforeAll(async () => {
        app = expressExtended();

        await app.useDataSource({
            type: 'sqlite',
            database: ':memory:',
            synchronize: true,
            entities: [__dirname + '../**/*.entity.{js,ts}'],
        });
        app.useController(AuthController);

        server = app.listen(3000);
    });

    it('should start server', async () => {
        const answer = await fetch('http://localhost:3000/auth', {
            method: 'POST',
            body: JSON.stringify({
                username: 'admin',
                password: 'admin',
            }),
        });

        expect(answer.status).toBe(401);
    });

    afterAll((done) => {
        server.close(done);
    });
});