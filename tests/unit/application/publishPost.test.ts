import { type PostEvents, PublishPost } from "../../../src/application/useCases/publishPost.usecase"
import { type IEventsRepository } from "../../../src/application/interfaces/events.repository"
import { type IPostRepository } from "../../../src/application/interfaces/post.repository"
import { type Mock, mock } from "ts-jest-mocker"

describe("Publish Post use case", () => {
  let eventsRepository: Mock<IEventsRepository<PostEvents>>
  let postRepository: Mock<IPostRepository>
  let publishPostUseCase: PublishPost

  const resetMocks = (): void => {
    postRepository = mock<IPostRepository>()
    eventsRepository = mock<IEventsRepository<PostEvents>>()
    publishPostUseCase = new PublishPost(eventsRepository, postRepository)

    jest.spyOn(postRepository, "add")
    jest.spyOn(eventsRepository, "emit")
  }

  beforeEach(() => {
    resetMocks()
  })

  it('should create a new Post and emit a "postPublished" event', async () => {
    postRepository.add.mockReturnValue(new Promise(resolve => { resolve(); }))
    eventsRepository.emit.mockReturnValue(true)

    const postContent = `Lorem ipsum dolor sit amet`
    const publishedPost = await publishPostUseCase.execute(postContent)

    expect(publishedPost.content).toEqual(postContent)
    expect(publishedPost.upvotes).toEqual(0)
    expect(postRepository.add).toHaveBeenCalled()
    expect(eventsRepository.emit).toHaveBeenCalled()
  })
})