import App from './app';
import * as bodyParser from 'body-parser';
import { environment } from './commons/environment';
import LoggerMiddleware from './middleware/logger';
import UserController from './controllers/userController';

// configura a inicialização do servidor
const app = new App({
    port: environment.server.port,
    controllers: [
        new UserController() 
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({extended: true}), 
        LoggerMiddleware

    ]
});

app.initializeDb().then(()=>{
    app.listen();
}).catch(()=>console.log('Erro ao iniciar banco'));
