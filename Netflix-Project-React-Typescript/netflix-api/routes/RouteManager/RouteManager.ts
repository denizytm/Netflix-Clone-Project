
import {Router} from "express"

const router = Router()
import userRouter from "../UserRoutes"

router.use("/api/user",userRouter)

export default router