import { type NextFunction, type Request, type Response } from "express";
import type Joi from "joi";

export function validateSchema(schema: Joi.Schema): (req: Request, res: Response, next: NextFunction) => Promise<void> {
  return async (req: Request, _, next: NextFunction): Promise<void> => {
    await schema.validateAsync(req.body)
    next()
  }
}