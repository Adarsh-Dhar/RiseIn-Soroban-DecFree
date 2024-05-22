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
const db_1 = require("../db");
const TOTAL_SUBMISSIONS = 100;
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const walletAddress = "0xf76daC24BaEf645ee0b3dfAc1997c6b838eF280D";
    const existingworker = yield prisma.worker.findFirst({
        where: {
            address: walletAddress
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
                address: walletAddress,
                pendingAmount: 0,
                lockedAmount: 0
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
    const workerId = req.body.workerId;
    const bid = (0, db_1.getNextBid)(workerId);
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
        res.json({
            bid
        });
    }
}));
//submission
router.post("/submission", worker_1.workerMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const workerId = req.body.workerId;
    const bid = yield (0, db_1.getNextBid)(workerId);
    if (!bid || bid.id !== body.bidId) {
        return res.status(400).json({
            message: "Invalid bid"
        });
    }
    const pool = bid.price / 10;
    const amount = pool / TOTAL_SUBMISSIONS;
    const submission = prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const submission = yield tx.submission.create({
            data: {
                answer: req.body.answer,
                workerId: workerId,
                //@ts-ignore
                bidId: bid.id,
                //@ts-ignore
                amount: amount
            }
        });
        yield tx.worker.update({
            where: {
                id: workerId
            },
            data: {
                pendingAmount: {
                    increment: amount
                }
            }
        });
        return submission;
    }));
    const nextBid = yield (0, db_1.getNextBid)(workerId);
    res.json({
        nextBid,
    });
}));
router.get("/balance", worker_1.workerMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const workerId = req.body.workerId;
    const worker = yield prisma.worker.findFirst({
        where: {
            id: workerId
        }
    });
    res.json({
        //@ts-ignore
        pendingAmount: worker.pendingAmount,
        //@ts-ignore
        lockedAmount: worker.lockedAmount
    });
}));
router.post("/payout", worker_1.workerMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const workerId = req.workerId;
    const worker = yield prisma.worker.findFirst({
        where: {
            id: Number(workerId)
        }
    });
    if (!worker) {
        return res.status(400).json({
            message: "Invalid worker"
        });
    }
    const address = worker.address;
    const txId = "0x1234567890";
    yield prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        yield tx.worker.update({
            where: {
                id: workerId
            },
            data: {
                pendingAmount: {
                    decrement: worker.pendingAmount
                },
                lockedAmount: {
                    increment: worker.pendingAmount
                }
            }
        });
        yield tx.payouts.create({
            data: {
                amount: worker.pendingAmount,
                signature: txId,
                workerId: workerId,
                status: "PENDING"
            }
        });
    }));
}));
exports.default = router;
