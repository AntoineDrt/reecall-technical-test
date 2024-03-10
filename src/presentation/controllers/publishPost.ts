import Joi from "joi"
import { type PublishPost } from "../../application/useCases/publishPost.usecase"
import { type Controller } from "./common/controller"
import { type Post } from "../../domain/post"

export interface PublishPostInputDto {
  content: string
}

export class PublishPostOutputDto {
  public readonly content: string
  public readonly creationTime: Date

  constructor(post: Post){
    this.content = post.content
    this.creationTime = post.creationTime
  }
}

const schema = Joi.object({
  content: Joi.string()
    .min(2)
    .max(1337)
    .required()
}).required()

export class PublishPostController implements Controller<PublishPostInputDto, PublishPostOutputDto> {
  constructor(
    private readonly usecase: PublishPost
  ) { }

  public async handle(input: PublishPostInputDto): Promise<PublishPostOutputDto> {
    await schema.validateAsync(input)
    
    const newPost = await this.usecase.execute(input.content)
    
    return new PublishPostOutputDto(newPost)
  }
}