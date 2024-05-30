"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const freelancer_1 = __importDefault(require("./routes/freelancer"));
const worker_1 = __importDefault(require("./routes/worker"));
const client_1 = __importDefault(require("./routes/client"));
const cors_1 = __importDefault(require("cors"));
const https = require('https');
const fs = require('fs');
const path = require('path');
app.use(express_1.default.json());
app.use((0, cors_1.default)());
exports.JWT_SECRET = "adarsh-secret";
const key = fs.readFileSync(path.join(__dirname, 'certs', 'server-key.pem'));
const cert = fs.readFileSync(path.join(__dirname, 'certs', 'server-cert.pem'));
const server = https.createServer({ key, cert }, app);
app.use("/v1/freelancer", freelancer_1.default);
app.use("/v1/worker", worker_1.default);
app.use("/v1/client", client_1.default);
const port = 3000;
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
