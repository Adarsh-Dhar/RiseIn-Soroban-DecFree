"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.freelancerMiddleware = void 0;
const __1 = require("..");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function freelancerMiddleware(req, res, next) {
    var _a;
    const authHeader = (_a = req.headers["authorization"]) !== null && _a !== void 0 ? _a : "";
    try {
        const decoded = jsonwebtoken_1.default.verify(authHeader, __1.JWT_SECRET);
        // @ts-ignore
        if (decoded.freelancerId) {
            // @ts-ignore
            req.freelancerId = decoded.freelancerId;
            return next();
        }
        else {
            res.status(401).json({
                message: "Unauthorized"
            });
        }
    }
    catch (e) {
        res.status(401).json({
            message: "Unauthorized"
        });
    }
}
exports.freelancerMiddleware = freelancerMiddleware;
