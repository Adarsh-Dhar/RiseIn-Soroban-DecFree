"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const client_1 = __importDefault(require("./routes/client"));
const freelancer_1 = __importDefault(require("./routes/freelancer"));
const worker_1 = __importDefault(require("./routes/worker"));
const cors_1 = __importDefault(require("cors"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
exports.JWT_SECRET = "adarsh-secret";
app.use("/v1/client", client_1.default);
app.use("/v1/freelancer", freelancer_1.default);
app.use("/v1/worker", worker_1.default);
const port = 3000;
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
