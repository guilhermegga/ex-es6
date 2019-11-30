import { Request, Response } from 'express';

const loggerMiddleware = (req: Request, resp: Response, next ) => {
    console.log ('Request logges: ', req.method, req.path);
    next();

};

export default loggerMiddleware;