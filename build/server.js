"use strict";
// server.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const config_1 = __importDefault(require("./utils/config"));
const dbConnection_1 = __importDefault(require("./utils/dbConnection"));
const PORT = (0, config_1.default)().port;
(0, dbConnection_1.default)().then(() => {
    app_1.app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
