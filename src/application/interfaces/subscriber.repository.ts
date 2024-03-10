import { type Subscriber } from "../../domain/subscriber";

export interface ISubscriberRepository {
  add: (subscriber: Subscriber) => Promise<Subscriber>
  get: (email: Subscriber["email"]) => Promise<Subscriber | null>
  list: () => Promise<Subscriber[]>
}