import IControllerBase from "../commons/interfaces/iControllerBase";
import * as express from 'express';
import { Request, Response } from 'express';
import {User} from '../models/user.model';

 class UserController implements IControllerBase {
    
    private path = '/users';
    private router = express.Router();

    constructor(){
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(this.path, this.getAll);
        this.router.get(this.path+'/:id', this.getById);
        this.router.post(this.path, this.createUser);
        this.router.delete(this.path+'/:id', this.delUser);
    }

    getAll(req: Request, res: Response, next) {
        User.find()
        .then((result) => {
            res.json(result);
        }).catch(()=>res.sendStatus(404));
        
        return next;
    }

    getById(req: Request, res: Response, next) {

        User.findById(req.params.id)
             .then((result) =>{
                res.json(result)
             }).catch(()=>res.sendStatus(404));

        return next;
    }

    createUser(req: Request, res: Response, next) {
        let user = new User(req.body);
         User.create(user)
             .then((result)=>{
                 result.password = undefined;
                res.json(result)
             }).catch(()=>res.sendStatus(404));

        return next;     
    }

    delUser(req: Request, res: Response, next) {

        console.log(req.params.id);
        
        User.deleteOne({_id: req.params.id}).then((cmdResult: any)=>{
            if(cmdResult.deletedCount){
              res.sendStatus(204);
            }else{
              res.sendStatus(404)
            }
            return next()
          }).catch(()=>{res.sendStatus(500)})
    }
}

export default UserController;
