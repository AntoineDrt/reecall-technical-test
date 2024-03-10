import { type Request, type Response, type NextFunction } from 'express'
import { ApiError, ErrorKinds } from '../common/error.type';
import { ValidationError } from 'joi';
import { BusinessError } from '../../application/common/errors';
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
  if (res.headersSent) {
    next(err); return;
  }

  const handleApiError = (error: ApiError): void => {
    req.log.warn(error)
    res.status(error.status).json(error)
  }

  if (err instanceof ApiError) {
    handleApiError(err)
    return
  } else if (err instanceof ValidationError) {
    handleApiError(new ApiError(ErrorKinds.validationError, err.details))
    return
  } else if (err instanceof BusinessError) {
    handleApiError(new ApiError(ErrorKinds.businessError, err.message))
    return
  }

  const internalError = new ApiError(ErrorKinds.internalError)
  req.log.error(err)
  res.status(internalError.status).json(internalError)
}