import { type Subscribe } from "../../application/useCases/subscribe.usecase";
import { type Controller } from "./common/controller";
import Joi from "joi";

export interface SubscribeInputDto {
  email: string
}

const schema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'fr'] } })
    .required()
}).required()

export class SubscriberController implements Controller<SubscribeInputDto, void>{
  constructor(
    private readonly usecase: Subscribe
  ){}

  public async handle(input: SubscribeInputDto): Promise<void> {
    await schema.validateAsync(input)
    await this.usecase.execute(input.email)
  }
}