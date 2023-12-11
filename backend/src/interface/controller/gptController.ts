import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from '../../infrastracture/configs/constants/statusCode'
import { successResponse } from '../../infrastracture/helpers/response'
import { fetchGptResponse } from '../../application/useCase/fetchGptResponseUseCase'


/**
 * GPTのコントローラ
 * @param {Response} res - the response object
 * @param {NextFunction} next - the next function to be called
 * @return {Promise<void>} a promise that resolves to void
 */
export const gptController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const inputText = req.query.text as string
    console.log(inputText)
    const response = await fetchGptResponse(inputText)
    console.log(response)
    successResponse(res, StatusCodes.OK, response)
  } catch (error) {
    next(error)
  }
}
