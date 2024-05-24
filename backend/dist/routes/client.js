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
router.post("/signin/:walletAddress", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const walletAddress = req.params.walletAddress;
    const existingclient = yield prisma.client.findFirst({
        where: {
            address: walletAddress
        }
    });
    if (existingclient) {
        const token = jsonwebtoken_1.default.sign({
            clientId: existingclient.id,
        }, __1.JWT_SECRET);
        res.json({
            token
        });
    }
    else {
        const client = yield prisma.client.create({
            // @ts-ignore
            data: {
                address: walletAddress,
            }
        });
        const token = jsonwebtoken_1.default.sign({
            clientId: client.id,
        }, __1.JWT_SECRET);
        res.json({
            token
        });
    }
}));
router.post("/projects", client_2.clientMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, price, Deadline } = req.body;
    //@ts-ignore
    const clientId = req.clientId;
    const project = yield prisma.project.create({
        // @ts-ignore
        data: {
            clientId,
            title,
            description,
            price,
            Deadline,
        }
    });
    res.json(project);
}));
router.get("/myProjects", client_2.clientMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const clientId = req.clientId;
    const projects = yield prisma.project.findMany({
        where: {
            clientId
        }
    });
    res.json(projects);
}));
router.get("/bids", client_2.clientMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = Number(req.query.projectId);
    const bids = yield prisma.bid.findMany({
        where: {
            projectId
        }
    });
    res.json(bids);
}));
exports.default = router;
