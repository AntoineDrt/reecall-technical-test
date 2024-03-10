import { type ISubscriberRepository } from "../../application/interfaces/subscriber.repository";
import { type Subscriber } from "../../domain/subscriber";


export class SubscriberRepository implements ISubscriberRepository {

  constructor(
    private readonly storedSubscribers: Subscriber[]
  ) { }

  public async add(subscriber: Subscriber): Promise<Subscriber> {
    this.storedSubscribers.push(subscriber);

    return subscriber
  }

  public async get(email: Subscriber["email"]): Promise<Subscriber | null> {
    return this.storedSubscribers.find(s => s.email === email) ?? null
  }

  public async list(): Promise<Subscriber[]> {
    return this.storedSubscribers;
  }

}
