import { NextFunction, Request, Response } from 'express'
import { HttpError } from '../configs/commonDomains/httpError'

/**
 * 正常レスポンスを送信する
 * Sends a success response with optional data and status code
 * @param res - The response object.
 * @param statusCode - The status code to send.
 * @param data - The optional data to send.
 */
export const successResponse = <T>(
  res: Response,
  statusCode: number,
  data?: T,
) => {
  res.status(statusCode)

  if (data) {
    res.send(data)
  }

  res.end()
}

/**
 * エラーをフォーマットする
 * Formatting errors
 * @param statusCode
 * @param tag
 * @param field
 * @param description
 * @returns
 */
export const formatError = (
  statusCode: number,
  tag: string,
  field?: { [key: string]: unknown },
  description?: string,
) => {
  const error = new HttpError({
    statusCode,
    message: {
      tag,
      field,
    },
    description,
  })
  return error
}