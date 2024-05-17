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
//get the github
router.get("/bid", worker_1.workerMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const workerId = req.body.workerId;
    const bid = yield prisma.bid.findFirst({
        where: {
            done: false,
            submission: {
                none: {
                    workerId: workerId
                }
            }
        }
    });
    if (!bid) {
        res.status(411).json({
            message: "No more bid for you to review"
        });
    }
    else {
        const project = yield prisma.project.findFirst({
            where: {
                id: bid.projectId
            }
        });
        res.json(project);
        res.json(bid);
    }
}));
//submission
router.post("/submission", worker_1.workerMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const workerId = req.body.workerId;
    const bid = yield prisma.bid.findFirst({
        where: {
            id: body.bidId
        }
    });
    if (!bid) {
        return res.status(400).json({
            message: "Bid not found"
        });
    }
    const totalPool = bid.price / 10;
    const amount = (totalPool / TOTAL_SUBMISSIONS).toString();
    const submission = yield prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const submission = yield prisma.submission.create({
            // @ts-ignore
            data: {
                workerId: workerId,
                bidId: body.bidId,
                amount,
            }
        });
        yield prisma.worker.update({
            where: {
                id: workerId
            }, data: {
                pendingAmount: {
                    increment: Number(amount)
                }
            }
        });
    }));
    return submission;
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
exports.default = router;
