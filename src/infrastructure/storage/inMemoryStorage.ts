import { type Post } from "../../domain/post"
import { type Subscriber } from "../../domain/subscriber"

export class InMemoryStorage {
  public data = {
    posts: [] as Post[],
    subscribers: [] as Subscriber[],
  }

  private static instance: InMemoryStorage

  public static getInstance(): InMemoryStorage {
    if (InMemoryStorage.instance === undefined) {
      InMemoryStorage.instance = new InMemoryStorage()
    }

    return InMemoryStorage.instance
  }
}