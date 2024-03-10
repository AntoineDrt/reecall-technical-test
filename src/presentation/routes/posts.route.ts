import { type Request, type Response, Router, type NextFunction } from 'express'
import { type PublishPostInputDto } from '../controllers/publishPost'
import { publishPostController } from '../../main'

const router = Router()

router.post('/posts', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const publishedPost = await publishPostController.handle(req.body as PublishPostInputDto)
    res.status(201).json(publishedPost)
  } catch (error) {
    next(error)
  }
})

export default router