import { gptController } from '../controller/gptController'
import { Router } from 'express'

const routes = Router()

/**
 * GPT接続のルータ
 */
routes.get(
  '/fetchResponse',
  gptController,
)

export const fetchGptRoute = routes