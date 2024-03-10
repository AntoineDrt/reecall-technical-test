import { type Request, type Response, Router, type NextFunction } from 'express'
import { subscribeController } from '../../main'
import { type SubscribeInputDto } from '../controllers/subscribe'

const router = Router()

router.post('/subscribers', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await subscribeController.handle(req.body as SubscribeInputDto)
    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

export default router