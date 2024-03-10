import { type Post } from "../../domain/post";

export interface IPostRepository {
  add: (post: Post) => Promise<void>
  update: (post: Post) => Promise<void>
  list: (limit: number, offset: number) => Promise<Post[]>
}