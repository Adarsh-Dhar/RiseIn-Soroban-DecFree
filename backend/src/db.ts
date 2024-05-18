import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export const getNextBid = async (userId : string) => {
    const bid = await prisma.bid.findFirst({
       where : {
        done : false,
        // @ts-ignore
        none : {
            workerId : userId,
        }
       }, 
       select : {
        // @ts-ignore
        title : true,
        description : true,
       }
    })

    return bid
}