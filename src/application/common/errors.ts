
export class BusinessError extends Error { }

export class EmailAlreadyExist extends BusinessError {
  constructor(
    email: string
  ) {
    super()
    this.message = `Email ${email} already subscribed`
  }
}