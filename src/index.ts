import {Api} from "@nerisma/express-api";

const api = new Api('APP_NAME');

api.start(3000).then(() => {
    console.log('API started');
});