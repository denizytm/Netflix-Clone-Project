"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const userRouter = (0, express_1.Router)();
userRouter.post("/add", UserController_1.addToLikedMovies);
userRouter.post("/get", UserController_1.getLikedMovies);
userRouter.post("/remove", UserController_1.removeFromLikedMovies);
exports.default = userRouter;
