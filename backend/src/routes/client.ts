import {Router} from 'express';
const router = Router();
import jwt from "jsonwebtoken"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient() 
import { JWT_SECRET } from '..';

import AWS from "aws-sdk"
import {S3Client , GetObjectCommand, PutObjectCommand} from "@aws-sdk/client-s3"
import { getSignedUrl} from '@aws-sdk/s3-request-presigner';
import { clientMiddleware } from '../middlewares/client';
import { create } from 'domain';







router.post("/signin",async (req, res) => {
   const walletAddress = "Adafrs"
   
   const existingUser = await prisma.freelancer.findFirst({
    where: {
        address : walletAddress

    }
   })
   

   if(existingUser){
    const token = jwt.sign({
         userId : existingUser.id,
    },JWT_SECRET)
    res.json({
        token
    })
   } else{
    const user = await prisma.client.create({
        data: {
            address : walletAddress
        }
    })
    const token = jwt.sign({
        userId : user.id,
    
    },JWT_SECRET)
    res.json({
        token
    })
   }
})



router.post("/project",clientMiddleware, async (req, res) => {
    const {title, description ,price, Deadline}= req.body
// @ts-ignore
    const clientId = req.clientId


    const client = await prisma.client.findFirst({
        where : {
        // @ts-ignore
            id : clientId
        }
    })

    

    //parse the signature to ensure the person has paid 50$
        const response = await prisma.project.create({
            // @ts-ignore
            data : {
                    title,
                    description,
                    price,
                    // @ts-ignore
                    Deadline,
                    assigned : false,
                    client : {
                        connect : {
                            // @ts-ignore
                            id : client.id
                        }
                    
                    }
            }
        })

        
   

    res.json({
        id : response.id
    })

   
})

router.get("/projects",clientMiddleware, async (req, res) => {
    // @ts-ignore
    const projectId = req.body.projectId
    // @ts-ignore
    const clientId = req.clientId

    const projectDetails = await prisma.project.findFirst({
        where : {
            id : Number(projectId),
            clientId : Number(clientId)
        }
    })

    if (!projectDetails){
        return res.status(404).json({
            error : "You don't have access to this project"
        })
    }

    res.json(projectDetails)

    
})

//get all bids for the project
router.get("/bids",clientMiddleware, async (req, res) => {
    // @ts-ignore
    const projectId : string = req.query.projectId
    const clientId = req.query.clientId

    const projectDetails = await prisma.project.findFirst({
        where : {
            id : Number(projectId),
            clientId : Number(clientId)
        }
    })

    if (!projectDetails){
        return res.status(404).json({
            error : "You don't have access to this project"
        })
    }

    const responses = await prisma.bid.findMany({
        where : {
            projectId : Number(projectId)
        },
        include : {
            project : true
        }
    })

    res.json(responses)
})

//select the bid
router.put("/selectBid",clientMiddleware, async (req, res) => {
    // @ts-ignore
    const bidId : string = req.body.bidId
 
    const acceptedBid = await prisma.bid.update({
        // @ts-ignore
        where : {
            id : Number(bidId),
        
        },data : {
            accepted : true
        }
    })

    res.json(acceptedBid)
    
})

export default router;