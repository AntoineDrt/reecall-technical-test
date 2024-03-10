import { Router } from "express";
import subscribersRoute from "./subscribers.route"
import postsRoute from "./posts.route"

const router = Router()

router.use(subscribersRoute)
router.use(postsRoute)

export default router