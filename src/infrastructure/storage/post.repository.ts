import { BusinessError } from "../../application/common/errors";
import { type IPostRepository } from "../../application/interfaces/post.repository";
import { type Post } from "../../domain/post";

export class PostRepository implements IPostRepository {
  
  constructor(
    private readonly storedPosts: Post[]
  ) { }

  public async add(post: Post): Promise<void> {
    this.storedPosts.push(post)
  }

  public async update(post: Post): Promise<void> {
    let postToUpdate = this.storedPosts.find(p => p.id === post.id)

    if (postToUpdate == null) {
      throw new BusinessError(`Post with id ${post.id} not found`)
    }

    postToUpdate = post
  }

  public async list(limit: number, offset: number): Promise<Post[]> {
    return this.storedPosts.slice(offset, limit + offset)
  }

}