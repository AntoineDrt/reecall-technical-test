import { type IEventsRepository } from "../interfaces/events.repository";
import { type IPostRepository } from "../interfaces/post.repository";
import { type UseCase } from "../common/useCase";
import { Post } from "../../domain/post";

export type PostEvents = {
  postPublished: (post: Post) => Promise<void>
}

export class PublishPost implements UseCase<Post["content"], Post> {
  constructor(
    private readonly postEvents: IEventsRepository<PostEvents>,
    private readonly postRepository: IPostRepository,
  ){}

  public async execute(postContent: Post["content"]): Promise<Post> {
    const newPost = new Post(postContent)

    await this.postRepository.add(newPost)

    this.postEvents.emit("postPublished", newPost)

    return newPost
  }
  
}