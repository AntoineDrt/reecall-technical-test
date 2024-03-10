
export class Subscriber {
  constructor(
    public readonly email: string,
    private readonly postsLiked: number = 0
  ){}
}