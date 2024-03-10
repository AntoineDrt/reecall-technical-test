import { SubscriberEventsRepository } from "./infrastructure/events/subscriberEvents.repository"
import { SubscriberRepository } from "./infrastructure/storage/subscriber.repository"
import { PostEventsRepository } from "./infrastructure/events/postEvents.repository"
import { Welcomesubscriber } from "./application/useCases/welcomeSubscriber.usecase"
import { setupNotificationSystem } from "./application/systems/notificationSystem"
import { EmailRepository } from "./infrastructure/communication/email.repository"
import { PublishPostController } from "./presentation/controllers/publishPost"
import { BroadcastPost } from "./application/useCases/broadcastPost.usecase"
import { SubscriberController } from "./presentation/controllers/subscribe"
import { InMemoryStorage } from "./infrastructure/storage/inMemoryStorage"
import { PostRepository } from "./infrastructure/storage/post.repository"
import { PublishPost } from "./application/useCases/publishPost.usecase"
import { Subscribe } from "./application/useCases/subscribe.usecase"
import { ApiServer } from "./presentation/app"
import 'dotenv/config'

/** Infrastructure Setup */
const storage = InMemoryStorage.getInstance()

const subscriberRepository = new SubscriberRepository(storage.data.subscribers)
const postRepository = new PostRepository(storage.data.posts)
const emailRepository = new EmailRepository()

const subscriberEvents = new SubscriberEventsRepository()
const postEvents = new PostEventsRepository()

/** Application Setup */
const broadcastPostUsecase = new BroadcastPost(subscriberRepository, emailRepository)
const subscribeUsecase = new Subscribe(subscriberEvents, subscriberRepository)
const publishPostUsecase = new PublishPost(postEvents, postRepository)
const welcomeSubscriberUsecase = new Welcomesubscriber(emailRepository)

setupNotificationSystem(
  welcomeSubscriberUsecase,
  broadcastPostUsecase,
  subscriberEvents,
  postEvents
)

/** Presentation Setup */
export const publishPostController = new PublishPostController(publishPostUsecase)
export const subscribeController = new SubscriberController(subscribeUsecase)

/** Framework  */
const server = new ApiServer()
server.run()