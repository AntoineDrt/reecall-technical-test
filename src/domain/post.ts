import { v4 as generateId } from "uuid"

export class Post {
  constructor(
    public readonly content: string,
    public upvotes: number = 0,
    public readonly id = generateId(),
    public readonly creationTime = new Date()
  ) { }

  public updateUpvotes(newScore: number): number {
    this.upvotes = newScore
    return this.upvotes
  }
}