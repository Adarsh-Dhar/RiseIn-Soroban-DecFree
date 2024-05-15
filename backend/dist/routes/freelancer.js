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
const freelancer_1 = require("../middlewares/freelancer");
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const walletAddress = "0xf76daC24BaEf645ee0b3dfAc1997c6b838eF280D";
    const github = req.body.github;
    const existingFreelancer = yield prisma.freelancer.findFirst({
        where: {
            address: walletAddress,
        }
    });
    if (existingFreelancer) {
        const token = jsonwebtoken_1.default.sign({
            freelancerId: existingFreelancer.id,
        }, __1.JWT_SECRET);
        res.json({
            token
        });
    }
    else {
        const freelancer = yield prisma.freelancer.create({
            data: {
                address: walletAddress,
                github: github
            }
        });
        const token = jsonwebtoken_1.default.sign({
            freelancerId: freelancer.id,
        }, __1.JWT_SECRET);
        res.json({
            token
        });
    }
}));
//get all projects
router.get("/projects", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield prisma.project.findMany();
    res.json(projects);
}));
//post bid
router.post("/bid", freelancer_1.freelancerMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId, price, deadline } = req.body;
    //@ts-ignore
    const freelancerId = req.freelancerId;
    const bid = yield prisma.bid.create({
        // @ts-ignore
        data: {
            price: price,
            deadline: deadline,
            projectId: projectId,
            freelancerId: freelancerId,
            accepted: false,
        }
    });
    res.json(bid);
}));
exports.default = router;
