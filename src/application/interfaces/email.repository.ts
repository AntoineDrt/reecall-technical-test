import { type Subscriber } from "../../domain/subscriber"

export interface IEmailRepository {
  send: (text: string, email: Subscriber["email"]) => Promise<void>
  broadcast: (text: string, email: Array<Subscriber["email"]>) => Promise<void>
}