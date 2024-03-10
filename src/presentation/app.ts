import { errorHandler } from './middlewares/errorHandler.middleware'
import express from 'express'
import router from './routes'
import pino from 'pino-http'
import cors from 'cors'
import { json } from 'body-parser'

export class ApiServer {
  private readonly app = express()

  constructor() {
    this.setup()
  }

  public run(): void {
    this.app.listen(process.env.PORT, () => {
      console.log(`✅ Server up and running`)
    })
  }

  private setup(): void {
    this.app.use(json())
    this.app.use(cors())
    this.app.use(pino())
    this.app.use(router)
    this.app.use(errorHandler)
  }

}
