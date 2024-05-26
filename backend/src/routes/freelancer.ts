import {Router} from 'express';
const router = Router();
import jwt from "jsonwebtoken"  
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { JWT_SECRET } from '..';
import { freelancerMiddleware } from '../middlewares/freelancer';

router.post("/signin",async  (req, res) => {
    const walletAddress = "0xf76daC24BaEf645ee0b3dfAc1997c6b838eF280D"
   
   const existingfreelancer = await prisma.freelancer.findFirst({
    where: {
        address : walletAddress

    }
   })
   

   if(existingfreelancer){
    const token = jwt.sign({
         freelancerId : existingfreelancer.id,
    },JWT_SECRET)
    res.json({
        token
    })
   } else{
    const freelancer = await prisma.freelancer.create({
        // @ts-ignore
        data: {
            address : walletAddress,
            
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
router.get("/availableProjects",async (req, res) => {
    const projects = await prisma.project.findMany({
        where : {
            assigned : false
        }
    })
    res.json(projects)
})

//post bid
router.post("/bid",freelancerMiddleware ,async (req, res) => {
    const {projectId,repo1,repo2,repo3} = req.body
    //@ts-ignore
    const freelancerId = req.freelancerId
    const bid = await prisma.bid.create({
        // @ts-ignore
        data: {
            
            projectId : projectId,
            freelancerId : freelancerId,
            accepted : false,
            repo1 : repo1,
            repo2 : repo2,
            repo3 : repo3,
            
            
        }
    })
    res.json(bid)
})





export default router;