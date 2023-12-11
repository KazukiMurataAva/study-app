import { StatusCodes } from "../constants/statusCode"

/**
 * サーバーエラークラス
 * Server error class
 */
export class HttpError extends Error {
  message = 'INTERNAL_SERVER_ERROR' // TODO
  statusCode: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR
  field?: { [key: string]: unknown }

  constructor(error: {
    statusCode: number
    message: { tag: string; field?: { [key: string]: unknown } }
    description?: string
  }) {
    super(error.description)
    Object.setPrototypeOf(this, new.target.prototype)
    this.message = error.message.tag
    this.field = error.message.field
    this.statusCode = error.statusCode
    Error.captureStackTrace(this)
  }
}