import express, { Request, Response, NextFunction } from 'express'
import * as dotenv from 'dotenv'
dotenv.config()
import { fetchGptRoute } from '../interface/routes/gptRoute'
import { fetchreadApiResponse } from '../interface/routes/readApiRoute'
const router = express.Router()

//base path
const basePath = '/api'

/* GET home page. */
router.get(basePath, function(_: Request, res: Response) {
  res.render('index', { title: 'StudyApp' })
})

router.use(basePath + '/gpt', fetchGptRoute)
router.use(basePath + '/read', fetchreadApiResponse)

module.exports = router
