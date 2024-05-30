import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '..';
import jwt from "jsonwebtoken"

export function workerMiddleware(req:Request,res:Response,next:NextFunction){
    const authHeader = req.headers["authorization"] ?? "";

    try{
        const decoded = jwt.verify(authHeader,JWT_SECRET)
        // @ts-ignore
        if(decoded.workerId){
            // @ts-ignore
            req.workerId = decoded.workerId
            return next()
        }else{
            res.status(401).json({
                message : "Unauthorized"
            })
        }
    }catch(e){
        res.status(401).json({
            message : "Unauthorized"
        })
    }
}