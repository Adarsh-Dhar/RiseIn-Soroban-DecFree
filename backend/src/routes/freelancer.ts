import {Router} from 'express';
const router = Router();
import jwt from "jsonwebtoken"  
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { JWT_SECRET } from '..';
import { freelancerMiddleware } from '../middlewares/freelancer';

router.post("/signin",async  (req, res) => {
    const walletAddress = "0xf76daC24BaEf645ee0b3dfAc1997c6b838eF280D"
    const github = req.body.github
   
   const existingFreelancer = await prisma.freelancer.findFirst({
    where: {
        address : walletAddress,
    
    }
   })
   

   if(existingFreelancer){
    const token = jwt.sign({
         freelancerId : existingFreelancer.id,
    },JWT_SECRET)
    res.json({
        token
    })
   } else{
    const freelancer = await prisma.freelancer.create({
        data: {
            address : walletAddress,
            github : github
        }
    })
    const token = jwt.sign({
        freelancerId : freelancer.id,
    
    },JWT_SECRET)
    res.json({
        token
    })
   }
})

//get all projects
router.get("/projects",async (req, res) => {
    const projects = await prisma.project.findMany()
    res.json(projects)
})

//post bid
router.post("/bid",freelancerMiddleware ,async (req, res) => {
    const {projectId,price,deadline} = req.body
    //@ts-ignore
    const freelancerId = req.freelancerId
    const bid = await prisma.bid.create({
        // @ts-ignore
        data: {
            price : price,
            deadline : deadline,
            projectId : projectId,
            freelancerId : freelancerId,
            accepted : false,
            
        }
    })
    res.json(bid)
})





export default router;