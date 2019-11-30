import * as express from 'express';
import { Application } from 'express';
import * as mongoose from 'mongoose';
import { environment } from './commons/environment'


class App {
    public app: Application;
    public port: any;
    constructor(appInit:{port: any; middleWares: any; controllers: any}){
        this.app = express();
        this.port = appInit.port;
        this.middlewares(appInit.middleWares)
        this.routes(appInit.controllers)    
    }

    // inicia os middlewares e os registra para serem usados
    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare)
        })
    }

    // registra todas as rotas que serão adicionadas no server
    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router)
        })
    }

    // inicializa o servidor na porta passada por parametro
    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`)
        })
    }

    
    public initializeDb() {
      return mongoose.connect(environment.db.url,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      })
    }

}
export default App;