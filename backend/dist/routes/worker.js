"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const __1 = require("..");
const worker_1 = require("../middlewares/worker");
const TOTAL_SUBMISSIONS = 100;
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { publicKey } = req.body;
    const existingworker = yield prisma.worker.findFirst({
        where: {
            address: publicKey
        }
    });
    if (existingworker) {
        const token = jsonwebtoken_1.default.sign({
            workerId: existingworker.id,
        }, __1.JWT_SECRET);
        res.json({
            token
        });
    }
    else {
        const worker = yield prisma.worker.create({
            // @ts-ignore
            data: {
                address: publicKey,
            }
        });
        const token = jsonwebtoken_1.default.sign({
            workerId: worker.id,
        }, __1.JWT_SECRET);
        res.json({
            token
        });
    }
}));
router.get("/nextBid", worker_1.workerMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const workerId = req.workerId;
    const bid = yield prisma.bid.findFirst({
        where: {
            done: false
        }
    });
    if (!bid) {
        return res.status(400).json({
            message: "No more bid for you to review"
        });
    }
    if (!bid) {
        res.status(411).json({
            message: "No more bid for you to review"
        });
    }
    else {
        res.json(bid);
    }
}));
//submission
// router.post("/submission",workerMiddleware,  async (req, res) => {
//    const body = req.body
//     const workerId = req.body.workerId
//     const bid = await getNextBid(workerId)
//     if(!bid || bid.id !== body.bidId){
//         return res.status(400).json({
//             message : "Invalid bid"
//         })
//     }
//     // const pool = bid.price / 10
//     // const amount = pool / TOTAL_SUBMISSIONS
//     // const submission = prisma.$transaction(async tx => {
//     //     const submission = await tx.submission.create({
//     //         data : {
//     //             answer : req.body.answer,
//     //             workerId : workerId,
//     //             //@ts-ignore
//     //             bidId : bid.id,
//     //             //@ts-ignore
//     //             amount : amount
//     //         }
//     //     })
//     //     await tx.worker.update({
//     //         where : {
//     //             id : workerId
//     //         },
//     //         data : {
//     //             pendingAmount : {
//     //                 increment : amount
//     //             }
//     //         }
//     //     })
//     //     return submission
//     // })
//     const nextBid = await getNextBid(workerId)
//     res.json({
//         nextBid,
//     })
// })
// router.get("/balance",workerMiddleware,  async (req, res) => {
//     const workerId = req.body.workerId
//     const worker = await prisma.worker.findFirst({
//         where : {
//             id : workerId
//         }
//     })
//     res.json({
//         //@ts-ignore
//         pendingAmount : worker.pendingAmount,
//         //@ts-ignore
// lockedAmount : worker.lockedAmount
//     })
// })
// router.post("/payout",  async (req, res) => {
//     // @ts-ignore
//     const workerId = req.workerId
//     const worker = await prisma.worker.findFirst({
//         where : {
//             id : Number(workerId)
//         }
//     })
//     if(!worker) {
//         return res.status(400).json({
//             message : "Invalid worker"
//         })
//     }
//     const address = worker.address
//     const txId = "0x1234567890"
//     await prisma.$transaction(async tx => {
//         await tx.worker.update({
//             where : {
//                 id : workerId
//             },
//             data : {
//                 pendingAmount : {
//                     decrement : worker.pendingAmount
//                 },
//                 lockedAmount : {
//                     increment : worker.pendingAmount
//             }
//         }
//         })
//         await tx.payouts.create({
//             data : {
//                 amount : worker.pendingAmount,
//                 signature : txId,
//                 workerId : workerId,
//                 status : "PENDING"
//             }
//         })
//     })
// })
exports.default = router;
