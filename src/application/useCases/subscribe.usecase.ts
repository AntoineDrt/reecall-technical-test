import { type ISubscriberRepository } from "../interfaces/subscriber.repository";
import { type IEventsRepository } from "../interfaces/events.repository";
import { EmailAlreadyExist } from "../common/errors";
import { Subscriber } from "../../domain/subscriber";
import { type UseCase } from "../common/useCase";

export type SubscriberEvents = {
  newSubscription: (subscriber: Subscriber) => Promise<void>
}

export class Subscribe implements UseCase<Subscriber["email"], void> {
  constructor(
    private readonly subscriberEvents: IEventsRepository<SubscriberEvents>,
    private readonly subscriberRepository: ISubscriberRepository
  ) { }

  public async execute(email: Subscriber["email"]): Promise<void> {
    const existingUser = await this.subscriberRepository.get(email)

    if (existingUser != null) {
      throw new EmailAlreadyExist(email);
    }

    const newSubscriber = new Subscriber(email)

    await this.subscriberRepository.add(newSubscriber);
    this.subscriberEvents.emit("newSubscription", newSubscriber)
  }
}