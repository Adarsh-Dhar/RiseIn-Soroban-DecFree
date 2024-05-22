import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '..';
import jwt from "jsonwebtoken"

export function clientMiddleware(req:Request,res:Response,next:NextFunction){
    const clientHeader = req.headers["authorization"] ?? "";

    try{
        const decoded = jwt.verify(clientHeader,JWT_SECRET)
        // @ts-ignore
        console.log(decoded)
        // @ts-ignore
        if(decoded.clientId){
            // @ts-ignore
            req.clientId = decoded.clientId
            return next()
        }else{
            res.status(401).json({
                message : "Unauthorized1",
                

            })

        }
    }catch(e){
        res.status(401).json({
            message : "Unauthorized2"
        })
    }
}