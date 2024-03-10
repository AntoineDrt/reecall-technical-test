import { type ISubscriberRepository } from "../interfaces/subscriber.repository";
import { type IEmailRepository } from "../interfaces/email.repository";
import { type UseCase } from "../common/useCase";
import { type Post } from "../../domain/post";

export class BroadcastPost implements UseCase<Post, void> {
  constructor(
    private readonly subscriberRepository: ISubscriberRepository,
    private readonly emailRepository: IEmailRepository,
  ){}

  public async execute(post: Post): Promise<void> {
    const subscribers = await this.subscriberRepository.list()
    
    await this.emailRepository.broadcast(post.content, subscribers.map(s => s.email))
  }
}