"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//packages
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
//router
const RouteManager_1 = __importDefault(require("./routes/RouteManager/RouteManager"));
dotenv_1.default.config(); // configuration for dotenv
const app = (0, express_1.default)(); // creating an express app
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // configuring the app
app.use(express_1.default.urlencoded({ extended: false }));
app.use(RouteManager_1.default);
if (process.env.MONGODB_URL)
    mongoose_1.default.connect(process.env.MONGODB_URL)
        .then(() => {
        console.log("Connection to mongodb is successfull");
    });
app.listen(process.env.PORT, () => {
    const { PORT } = process.env;
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
