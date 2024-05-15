import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '..';
import jwt from "jsonwebtoken"

export function freelancerMiddleware(req:Request,res:Response,next:NextFunction){
    const authHeader = req.headers["authorization"] ?? "";

    try{
        const decoded = jwt.verify(authHeader,JWT_SECRET)
        // @ts-ignore
        if(decoded.freelancerId){
            // @ts-ignore
            req.freelancerId = decoded.freelancerId
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