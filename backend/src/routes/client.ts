import {Router} from 'express';
const router = Router();
import jwt from "jsonwebtoken"  
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { JWT_SECRET } from '..';
import { Token } from 'aws-sdk';

router.post("/signin",async  (req, res) => {
    const walletAddress = "hdbdjhsuydyufy" 
   
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

router.post("/projects",  async (req, res) => {
    const {title,description,price } = req.body
    //@ts-ignore
    const clientId = req.clientId
    const project = await prisma.project.create({
        
        // @ts-ignore
        data: {
            clientId,
            title,
            description,
            price
                
        }
    })
    res.json(project)
})

router.get("/myProjects",  async (req, res) => {
    //@ts-ignore
    const clientId = req.clientId
    const projects = await prisma.project.findMany({
        where: {
            clientId
        }
    })

    res.json(projects)
})

router.get("/bids",    async (req, res) => {
    const projectId = Number(req.query.projectId);

    const bids = await prisma.bid.findMany({
        where: {
            projectId
        }
    });

    res.json(bids);
});

//select bid
router.put("/selectBid",    async (req, res) => {
    const {bidId} = req.body
    //@ts-ignore
    const clientId = req.clientId
    const bid = await prisma.bid.findFirst({
        where: {
            id: bidId
        },
        //@ts-ignore
        update : {
            accepted : true
        }
    })
    res.json(bid)
})


export default router;

 

