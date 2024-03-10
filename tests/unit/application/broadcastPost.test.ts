import { type IEmailRepository } from "../../../src/application/interfaces/email.repository"
import { type ISubscriberRepository } from "../../../src/application/interfaces/subscriber.repository"
import { BroadcastPost } from "../../../src/application/useCases/broadcastPost.usecase"
import { type Mock, mock } from "ts-jest-mocker"
import { Post } from "../../../src/domain/post"
import { Subscriber } from "../../../src/domain/subscriber"

describe("Broadcast Post use case", () => {
  let emailRepository: Mock<IEmailRepository>
  let subscriberRepository: Mock<ISubscriberRepository>
  let broadcastPostUseCase: BroadcastPost

  const resetMocks = (): void => {
    emailRepository = mock<IEmailRepository>()
    subscriberRepository = mock<ISubscriberRepository>()
    broadcastPostUseCase = new BroadcastPost(subscriberRepository, emailRepository)

    jest.spyOn(emailRepository, "broadcast")
    jest.spyOn(subscriberRepository, "list")
  }

  beforeEach(() => {
    resetMocks()
  })

  it('should send new post to all users', async () => {
    const newPost = new Post(`Lorem ipsum dolor sit amet`)
    const subscriberEmail = "test@gmail.com"

    emailRepository.broadcast.mockReturnValue(new Promise(resolve => { resolve() }))
    subscriberRepository.list.mockReturnValue(new Promise(resolve => { resolve([new Subscriber(subscriberEmail)]) }))

    await broadcastPostUseCase.execute(newPost)

    expect(subscriberRepository.list).toHaveBeenCalled()
    expect(emailRepository.broadcast).toHaveBeenCalledWith(newPost.content, [subscriberEmail])
  })
})