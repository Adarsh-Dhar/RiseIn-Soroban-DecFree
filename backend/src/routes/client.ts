import {Router} from 'express';
const router = Router();
import jwt from "jsonwebtoken"  
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { JWT_SECRET } from '..';
import { clientMiddleware } from '../middlewares/client';
import { Token } from 'aws-sdk';

router.post("/signin",async  (req, res) => {
    const walletAddress = "0xf76daC24BaEf645ee0b3dfAc1997c6b838eF280D"
   
   const existingclient = await prisma.client.findFirst({
    where: {
        address : walletAddress

    }
   })
   

   if(existingclient){
    const token = jwt.sign({
         clientId : existingclient.id,
    },JWT_SECRET)
    res.json({
        token
    })
   } else{
    const client = await prisma.client.create({
        // @ts-ignore
        data: {
            address : walletAddress,
            
        }
    })
    const token = jwt.sign({
        clientId : client.id,
    
    },JWT_SECRET)
    res.json({
        token
    })
   }

})

 

