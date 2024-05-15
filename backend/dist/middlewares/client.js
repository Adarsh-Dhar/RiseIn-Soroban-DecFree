"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientMiddleware = void 0;
const __1 = require("..");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function clientMiddleware(req, res, next) {
    var _a;
    const clientHeader = (_a = req.headers["authorization"]) !== null && _a !== void 0 ? _a : "";
    try {
        const decoded = jsonwebtoken_1.default.verify(clientHeader, __1.JWT_SECRET);
        // @ts-ignore
        console.log(decoded.userId);
        // @ts-ignore
        if (decoded.userId) {
            // @ts-ignore
            req.clientId = decoded.userId;
            return next();
        }
        else {
            res.status(401).json({
                message: "Unauthorized1",
            });
        }
    }
    catch (e) {
        res.status(401).json({
            message: "Unauthorized2"
        });
    }
}
exports.clientMiddleware = clientMiddleware;
