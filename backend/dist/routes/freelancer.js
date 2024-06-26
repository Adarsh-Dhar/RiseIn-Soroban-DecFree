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
    const { publicKey } = req.body;
    const existingfreelancer = yield prisma.freelancer.findFirst({
        where: {
            address: publicKey
        }
    });
    if (existingfreelancer) {
        const token = jsonwebtoken_1.default.sign({
            freelancerId: existingfreelancer.id,
        }, __1.JWT_SECRET);
        res.json({
            token
        });
    }
    else {
        const freelancer = yield prisma.freelancer.create({
            // @ts-ignore
            data: {
                address: publicKey,
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
router.get("/availableProjects", freelancer_1.freelancerMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield prisma.project.findMany({
        where: {
            assigned: false
        }
    });
    res.json(projects);
}));
//select project
router.get("/selectProject", freelancer_1.freelancerMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, price } = req.body;
    //@ts-ignore
    const freelancerId = req.freelancerId;
    const project = yield prisma.project.findFirst({
        where: {
            title,
            description,
            price,
            // @ts-ignore
        }
    });
    res.json(project === null || project === void 0 ? void 0 : project.id);
}));
//post bid
router.post("/bid", freelancer_1.freelancerMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId, repo } = req.body;
    //@ts-ignore
    const freelancerId = req.freelancerId;
    const bid = yield prisma.bid.create({
        // @ts-ignore
        data: {
            projectId: projectId,
            freelancerId: freelancerId,
            accepted: false,
            repo: repo,
            yesCount: 0,
            noCount: 0,
        }
    });
    res.json(bid);
}));
exports.default = router;
