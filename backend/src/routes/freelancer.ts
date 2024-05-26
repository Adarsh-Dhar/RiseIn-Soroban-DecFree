import {Router} from 'express';
const router = Router();
import jwt from "jsonwebtoken"  
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { JWT_SECRET } from '..';

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

//select project
router.get("/selectProject",  async (req, res) => {
    const {title,description,price, } = req.body
    //@ts-ignore
    const freelancerId = req.freelancerId
    const project = await prisma.project.findFirst({
        where: {
             title,
                description,
                price,
                // @ts-ignore
                  
        }
        
    })
    res.json(project?.id)
})

//post bid
router.post("/bid",  async (req, res) => {
    const {projectId,repo} = req.body
    //@ts-ignore
    const freelancerId = req.freelancerId
    const bid = await prisma.bid.create({
        // @ts-ignore
        data: {
            
            projectId : projectId,
            freelancerId : freelancerId,
            accepted : false,
            repo : repo,
            
            
            
        }
    })
    res.json(bid)
})





export default router;