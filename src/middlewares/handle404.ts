import { Express, Request, Response, NextFunction } from "express";

const handle404 = (app: Express): void => {
    app.use((req: Request, res: Response, next: NextFunction) => {
        const message = "Impossible to find this Page. Try another URL";
        res.status(404).json({message});
    });
};

export default handle404;