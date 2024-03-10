
export class ApiError {

  public status: ErrorKind["status"]
  public message: ErrorKind["message"]
  public details?: any

  constructor(
    error: ErrorKind,
    details?: any
  ) {
    this.status = error.status
    this.message = error.message
    this.details = details
  }
}

export class ErrorKind {
  constructor(
    public readonly status: number,
    public readonly message: string,
  ){}
}

export const ErrorKinds = {
  validationError: new ErrorKind(400, "The input data does not satisfy the validation requirements"),
  businessError: new ErrorKind(400, "The request violates a core business rule"),
  internalError: new ErrorKind(500, "An internal error occured"),
}