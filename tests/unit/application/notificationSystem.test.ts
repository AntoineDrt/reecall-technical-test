
import { type BroadcastPost } from "../../../src/application/useCases/broadcastPost.usecase"
import { type Mock, mock } from "ts-jest-mocker"
import { Post } from "../../../src/domain/post"
import { Subscriber } from "../../../src/domain/subscriber"
import { type Welcomesubscriber } from "../../../src/application/useCases/welcomeSubscriber.usecase"
import { type IEventsRepository } from "../../../src/application/interfaces/events.repository"
import { type SubscriberEvents } from "../../../src/application/useCases/subscribe.usecase"
import { type PostEvents } from "../../../src/application/useCases/publishPost.usecase"
import { SubscriberEventsRepository } from "../../../src/infrastructure/events/subscriberEvents.repository"
import { PostEventsRepository } from "../../../src/infrastructure/events/postEvents.repository"
import { setupNotificationSystem } from "../../../src/application/systems/notificationSystem"

describe("Notification system", () => {
  let subscriberEvents: IEventsRepository<SubscriberEvents>
  let postEvents: IEventsRepository<PostEvents>
  let broadcastPostUseCase: Mock<BroadcastPost>
  let welcomeSubscriberUsecase: Mock<Welcomesubscriber>

  const resetMocks = (): void => {
    subscriberEvents = new SubscriberEventsRepository()
    postEvents = new PostEventsRepository()
    broadcastPostUseCase = mock<BroadcastPost>()
    welcomeSubscriberUsecase = mock<Welcomesubscriber>()

    setupNotificationSystem(
      welcomeSubscriberUsecase,
      broadcastPostUseCase,
      subscriberEvents,
      postEvents)

    jest.spyOn(broadcastPostUseCase, "execute")
    jest.spyOn(welcomeSubscriberUsecase, "execute")
  }

  beforeEach(() => {
    resetMocks()
  })

  it('should execute Welcomesubscriber use case when "newSubscription" event is emitted', async () => {
    welcomeSubscriberUsecase.execute.mockReturnValue(new Promise(resolve => { resolve(); }))

    const subscriberEmail = "test@gmail.com"

    subscriberEvents.emit("newSubscription", new Subscriber(subscriberEmail))

    expect(welcomeSubscriberUsecase.execute).toHaveBeenCalledWith(subscriberEmail)
  })

  it('should execute BroadcastPost use case when "postPublished" event is emitted', async () => {
    broadcastPostUseCase.execute.mockReturnValue(new Promise(resolve => { resolve(); }))

    const newPost = new Post(`Lorem ipsum dolor sit amet`)

    postEvents.emit("postPublished", newPost)

    expect(broadcastPostUseCase.execute).toHaveBeenCalledWith(newPost)
  })
})