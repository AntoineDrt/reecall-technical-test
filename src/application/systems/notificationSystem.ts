import { type SendWelcomeEmail } from "../useCases/sendWelcomeEmail.usecase";
import { type IEventsRepository } from "../interfaces/events.repository";
import { type BroadcastPost } from "../useCases/broadcastPost.usecase";
import { type SubscriberEvents } from "../useCases/subscribe.usecase";
import { type PostEvents } from "../useCases/publishPost.usecase";
import { type Subscriber } from "../../domain/subscriber";
import { type Post } from "../../domain/post";

export function setupNotificationSystem(
  sendWelcomeEmailUsecase: SendWelcomeEmail,
  broadcastPostUsecase: BroadcastPost,
  subscriberEvents: IEventsRepository<SubscriberEvents>,
  postEvents: IEventsRepository<PostEvents>): void {

  postEvents.on(
    "postPublished", 
    async (post: Post) => { 
      await broadcastPostUsecase.execute(post) 
    })

  subscriberEvents.on(
    "newSubscription", 
    async (subscriber: Subscriber) => { 
      await sendWelcomeEmailUsecase.execute(subscriber.email) 
    })
}