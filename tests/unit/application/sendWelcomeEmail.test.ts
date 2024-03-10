import { type IEmailRepository } from "../../../src/application/interfaces/email.repository"
import { type Mock, mock } from "ts-jest-mocker"
import { Welcomesubscriber } from "../../../src/application/useCases/welcomeSubscriber.usecase"

describe("Send welcome email use case", () => {
  let emailRepository: Mock<IEmailRepository>
  let welcomeSubscriberUsecase: Welcomesubscriber

  const resetMocks = (): void => {
    emailRepository = mock<IEmailRepository>()
    welcomeSubscriberUsecase = new Welcomesubscriber(emailRepository)

    jest.spyOn(emailRepository, "send")
  }

  beforeEach(() => {
    resetMocks()
  })

  it('should send a welcome email', async () => {
    const newSubscriberEmail = "test@gmail.com"
    const expectedWelcomeText = `
        "Welcome to the newsletter ! 
        You will receive new posts very soon !"
    `
    emailRepository.send.mockReturnValue(new Promise(resolve => { resolve()}))

    await welcomeSubscriberUsecase.execute(newSubscriberEmail)

    expect(emailRepository.send).toHaveBeenCalledWith(expectedWelcomeText, newSubscriberEmail)
  })
})