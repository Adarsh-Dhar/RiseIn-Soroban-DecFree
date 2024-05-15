"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProjectInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createProjectInput = zod_1.default.object({
    title: zod_1.default.string(),
    description: zod_1.default.string(),
    budget: zod_1.default.number(),
    deadline: zod_1.default.date(),
    signature: zod_1.default.string(),
});
