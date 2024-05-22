import {Router} from 'express';
const router = Router();
import jwt from "jsonwebtoken"  
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { JWT_SECRET } from '..';
import { workerMiddleware } from '../middlewares/worker';
import { getNextBid } from '../db';

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

router.get("/nextBid",workerMiddleware ,async (req, res) => {
    const workerId = req.body.workerId


    const bid = getNextBid(workerId)
    if(!bid){
        return res.status(400).json({
            message : "No more bid for you to review"
        })
    }
   
if(!bid){
    res.status(411).json({
       message : "No more bid for you to review"
    })
}else{
    res.json({
        bid
    })
}
    
})




//submission
router.post("/submission",workerMiddleware ,async (req, res) => {
   const body = req.body

    const workerId = req.body.workerId

    const bid = await getNextBid(workerId)
    if(!bid || bid.id !== body.bidId){
        return res.status(400).json({
            message : "Invalid bid"
        })


    }

    const pool = bid.price / 10

    const amount = pool / TOTAL_SUBMISSIONS

    const submission = prisma.$transaction(async tx => {
        const submission = await tx.submission.create({
            data : {
                answer : req.body.answer,
                workerId : workerId,
                //@ts-ignore
                bidId : bid.id,
                //@ts-ignore
                amount : amount
            }
        })

        await tx.worker.update({
            where : {
                id : workerId
            },
            data : {
                pendingAmount : {
                    increment : amount
                }
            }
        })
        

        return submission
    })

    

    const nextBid = await getNextBid(workerId)
    res.json({
        nextBid,
        
    })
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

router.post("/payout",workerMiddleware ,async (req, res) => {
    // @ts-ignore
    const workerId = req.workerId
    const worker = await prisma.worker.findFirst({
        where : {
            id : Number(workerId)
        }
    })

    if(!worker) {
        return res.status(400).json({
            message : "Invalid worker"
        })
    }

    const address = worker.address

    const txId = "0x1234567890"

    await prisma.$transaction(async tx => {
        await tx.worker.update({
            where : {
                id : workerId
            },
            data : {
                pendingAmount : {
                    decrement : worker.pendingAmount
                },
                lockedAmount : {
                    increment : worker.pendingAmount
            }
        }
        })

        await tx.payouts.create({
            data : {
                amount : worker.pendingAmount,
                signature : txId,
                workerId : workerId,
                status : "PENDING"
            }
        })
    })
})


export default router;