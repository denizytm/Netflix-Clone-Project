import { Router } from "express"
import { addToLikedMovies , getLikedMovies , removeFromLikedMovies } from "../controllers/UserController"
const userRouter = Router()

userRouter.post("/add",addToLikedMovies)
userRouter.post("/get",getLikedMovies)
userRouter.post("/remove",removeFromLikedMovies)

export default userRouter