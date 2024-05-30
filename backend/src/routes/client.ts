import {Router} from 'express';
const router = Router();
import jwt from "jsonwebtoken"  
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { JWT_SECRET } from '..';
import { Token } from 'aws-sdk';
import { clientMiddleware } from '../middlewares/client';

router.post("/signin",async  (req, res) => {
    const {publicKey} = req.body 
   
   const existingclient = await prisma.client.findFirst({
    where: {
        address : publicKey

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
            address : publicKey,
            
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

router.post("/projects",clientMiddleware,  async (req, res) => {
    const {title,description,price } = req.body
    //@ts-ignore
    const clientId = req.clientId
    const project = await prisma.project.create({
        
        // @ts-ignore
        data: {
            title,
            description,
            price,
            client : {
                connect : {
                    id : clientId
                }
            }
                
        }
    })
    res.json(project)
})

router.get("/myProjects", clientMiddleware, async (req, res) => {
    //@ts-ignore
    const clientId = req.clientId
    const projects = await prisma.project.findMany({
        where: {
            clientId
        }
    })

    res.json(projects)
})

router.get("/bids", clientMiddleware,   async (req, res) => {
    const {projectId} = req.body;

    const bids = await prisma.bid.findMany({
        where: {
            projectId
        }
    });

    res.json(bids);
});

//select bid
router.put("/selectBid", clientMiddleware,   async (req, res) => {
    const {bidId} = req.body
    //@ts-ignore
    const clientId = req.clientId
    const bid = await prisma.bid.update({
        where: {
            id: bidId
        },
        //@ts-ignore
        data : {
            accepted : true
        }
    })
    res.json(bid)
})


export default router;

 

