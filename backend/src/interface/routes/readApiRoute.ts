import { readApiController } from '../controller/readApiController'
import { Router } from 'express'

const routes = Router()

/**
 * readApi接続のルータ
 */
routes.get(
  '/fetchResponse',
  readApiController,
)

export const fetchreadApiResponse = routes