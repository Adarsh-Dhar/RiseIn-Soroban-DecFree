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
const client_2 = require("../middlewares/client");
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const walletAddress = "Adafrs";
    const existingUser = yield prisma.freelancer.findFirst({
        where: {
            address: walletAddress
        }
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({
            userId: existingUser.id,
        }, __1.JWT_SECRET);
        res.json({
            token
        });
    }
    else {
        const user = yield prisma.client.create({
            data: {
                address: walletAddress
            }
        });
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
        }, __1.JWT_SECRET);
        res.json({
            token
        });
    }
}));
router.post("/project", client_2.clientMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, price, Deadline } = req.body;
    // @ts-ignore
    const clientId = req.clientId;
    const client = yield prisma.client.findFirst({
        where: {
            // @ts-ignore
            id: clientId
        }
    });
    //parse the signature to ensure the person has paid 50$
    const response = yield prisma.project.create({
        // @ts-ignore
        data: {
            title,
            description,
            price,
            // @ts-ignore
            Deadline,
            assigned: false,
            client: {
                connect: {
                    // @ts-ignore
                    id: client.id
                }
            }
        }
    });
    res.json({
        id: response.id
    });
}));
router.get("/projects", client_2.clientMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const projectId = req.body.projectId;
    // @ts-ignore
    const clientId = req.clientId;
    const projectDetails = yield prisma.project.findFirst({
        where: {
            id: Number(projectId),
            clientId: Number(clientId)
        }
    });
    if (!projectDetails) {
        return res.status(404).json({
            error: "You don't have access to this project"
        });
    }
    res.json(projectDetails);
}));
//get all bids for the project
router.get("/bids", client_2.clientMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const projectId = req.query.projectId;
    const clientId = req.query.clientId;
    const projectDetails = yield prisma.project.findFirst({
        where: {
            id: Number(projectId),
            clientId: Number(clientId)
        }
    });
    if (!projectDetails) {
        return res.status(404).json({
            error: "You don't have access to this project"
        });
    }
    const responses = yield prisma.bid.findMany({
        where: {
            projectId: Number(projectId)
        },
        include: {
            project: true
        }
    });
    res.json(responses);
}));
//select the bid
router.put("/selectBid", client_2.clientMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const bidId = req.body.bidId;
    const acceptedBid = yield prisma.bid.update({
        // @ts-ignore
        where: {
            id: Number(bidId),
        }, data: {
            accepted: true
        }
    });
    res.json(acceptedBid);
}));
exports.default = router;
