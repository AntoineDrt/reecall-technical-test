import { Subscribe, type SubscriberEvents } from "../../../src/application/useCases/subscribe.usecase"
import { type ISubscriberRepository } from "../../../src/application/interfaces/subscriber.repository"
import { type IEventsRepository } from "../../../src/application/interfaces/events.repository"
import { EmailAlreadyExist } from "../../../src/application/common/errors"
import { Subscriber } from "../../../src/domain/subscriber"
import { type Mock, mock } from "ts-jest-mocker"

describe("Subscribe use case", () => {
  let subscriberRepository: Mock<ISubscriberRepository>
  let eventsRepository: Mock<IEventsRepository<SubscriberEvents>>
  let subscribeUseCase: Subscribe

  const resetMocks = (): void => {
    subscriberRepository = mock<ISubscriberRepository>()
    eventsRepository = mock<IEventsRepository<SubscriberEvents>>()
    subscribeUseCase = new Subscribe(eventsRepository, subscriberRepository)

    jest.spyOn(subscriberRepository, "get")
    jest.spyOn(subscriberRepository, "add")
    jest.spyOn(eventsRepository, "emit")
  }

  beforeEach(() => {
    resetMocks()
  })

  it('should create a new Subscriber and emit a "newSubscription" event', async () => {
    const newSubscriberEmail = 'test@gmail.com'
    const newSubscriber = new Subscriber(newSubscriberEmail)

    subscriberRepository.get.mockReturnValue(new Promise(resolve => { resolve(null); }))
    subscriberRepository.add.mockReturnValue(new Promise(resolve => { resolve(newSubscriber); }))
    eventsRepository.emit.mockReturnValue(true)

    await subscribeUseCase.execute(newSubscriberEmail)

    expect(subscriberRepository.get).toHaveBeenCalledWith(newSubscriberEmail)
    expect(subscriberRepository.add).toHaveBeenCalledWith(newSubscriber)
    expect(eventsRepository.emit).toHaveBeenCalledWith("newSubscription", newSubscriber)
  })

  it('should throw an error if the email already exists', async () => {
    const duplicateEmail = 'duplicate@gmail.com'

    subscriberRepository.get.mockReturnValue(
      new Promise(resolve => { resolve(new Subscriber(duplicateEmail)) })
    )

    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    await expect(subscribeUseCase.execute(duplicateEmail))
      .rejects
      .toThrow(new EmailAlreadyExist(duplicateEmail))

    expect(subscriberRepository.add).not.toHaveBeenCalled()
    expect(eventsRepository.emit).not.toHaveBeenCalled()
  })
})