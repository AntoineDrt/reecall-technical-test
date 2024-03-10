import EventEmitter from "node:events"
import { type IEventsRepository } from "../../application/interfaces/events.repository";
import { type PostEvents } from "../../application/useCases/publishPost.usecase";


export class PostEventsRepository extends (EventEmitter as new () => IEventsRepository<PostEvents>) {}