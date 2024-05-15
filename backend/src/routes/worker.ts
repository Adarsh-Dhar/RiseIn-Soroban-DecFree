import {Router} from 'express';
const router = Router();
import jwt from "jsonwebtoken"  
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { JWT_SECRET } from '..';
import { workerMiddleware } from '../middlewares/worker';

const TOTAL_SUBMISSIONS = 100

router.post("/signin",async  (req, res) => {
    const walletAddress = "0xf76daC24BaEf645ee0b3dfAc1997c6b838eF280D"
   
   const existingworker = await prisma.worker.findFirst({
    where: {
        address : walletAddress

    }
   })
   

   if(existingworker){
    const token = jwt.sign({
         workerId : existingworker.id,
    },JWT_SECRET)
    res.json({
        token
    })
   } else{
    const worker = await prisma.worker.create({
        // @ts-ignore
        data: {
            address : walletAddress,
            pendingAmount : 0,
            lockedAmount : 0
        }
    })
    const token = jwt.sign({
        workerId : worker.id,
    
    },JWT_SECRET)
    res.json({
        token
    })
   }
})

//get the github
router.get("/bid",workerMiddleware ,async (req, res) => {
    const workerId = req.body.workerId
   
    const bid = await prisma.bid.findFirst({
      where : {
        done : false,
        submission : {
            none : {
                workerId : workerId
            
            }
        }
      }
      
    })
    if(!bid){
        res.status(411).json({
            message : "No more bid for you to review"
        })
    }else{
        const project = await prisma.project.findFirst({
            where : {
                id : bid.projectId
            }

        })
        res.json(project)
        res.json(bid)

    }


})

//submission
router.post("/submission",workerMiddleware ,async (req, res) => {
   const body = req.body

    const workerId = req.body.workerId

    const bid = await prisma.bid.findFirst({
        where : {
            id : body.bidId
        }
    })
    if(!bid){
        return res.status(400).json({
            message : "Bid not found"
        })
    }

    const totalPool = bid.price/10
    const amount = (totalPool/TOTAL_SUBMISSIONS).toString()

    const submission = await prisma.$transaction(async tx => {
        const submission = await prisma.submission.create({
            // @ts-ignore
            data : {
                workerId : workerId,
                bidId : body.bidId,
                
                amount,
            }
        })

        await prisma.worker.update({
            where : {
                id : workerId
            },data : {
                pendingAmount : {
                     increment : Number(amount)
                }
            }
            })
        })

        return submission
    })

router.get("/balance",workerMiddleware ,async (req, res) => {
    const workerId = req.body.workerId

    const worker = await prisma.worker.findFirst({
        where : {
            id : workerId
        }
    })

    res.json({
        //@ts-ignore
        pendingAmount : worker.pendingAmount,
        //@ts-ignore
lockedAmount : worker.lockedAmount
    })
})

    

   



export default router;