import { type IEmailRepository } from "../interfaces/email.repository";
import { type Subscriber } from "../../domain/subscriber";
import { type UseCase } from "../common/useCase";

export class SendWelcomeEmail implements UseCase<Subscriber["email"], void> {
  constructor(
    private readonly emailRepository: IEmailRepository,
  ) { }

  public async execute(email: Subscriber["email"]): Promise<void> {
    const welcomeText = `
        "Welcome to the newsletter ! 
        You will receive new posts very soon !"
    `

    await this.emailRepository.send(welcomeText, email)
  }
}