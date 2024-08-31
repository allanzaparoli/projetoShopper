"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const config_1 = require("./database/config");
const measure_model_1 = __importDefault(require("./models/measure.model"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use("/", routes_1.default);
const startServer = async () => {
    try {
        await (0, config_1.connectDatabase)();
        await measure_model_1.default.sync({ alter: true });
        app.listen(port, () => {
            console.log("Servidor rodando na porta:", port);
        });
    }
    catch (error) {
        console.error("Erro ao iniciar o servidor:", error);
    }
};
// Start the server
startServer();
//# sourceMappingURL=index.js.map