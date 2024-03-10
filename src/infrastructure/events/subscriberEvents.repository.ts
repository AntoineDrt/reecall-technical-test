import EventEmitter from "node:events"
import { type IEventsRepository } from "../../application/interfaces/events.repository";
import { type SubscriberEvents } from "../../application/useCases/subscribe.usecase";

export class SubscriberEventsRepository extends (EventEmitter as new () => IEventsRepository<SubscriberEvents>) {}