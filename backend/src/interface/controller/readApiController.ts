import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from '../../infrastracture/configs/constants/statusCode'
import { successResponse } from '../../infrastracture/helpers/response'
import { fetchReadApiUseCase } from '../../infrastracture/helpers/ocrApi'


/**
 * readAPIのコントローラ
 * @param {Response} res - the response object
 * @param {NextFunction} next - the next function to be called
 * @return {Promise<void>} a promise that resolves to void
 */
export const readApiController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const response = await fetchReadApiUseCase()
    console.log('response: ' + response)
    console.log('finish')
    successResponse(res, StatusCodes.OK, response)
  } catch (error) {
    next(error)
  }
}