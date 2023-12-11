import express, { Request, Response, NextFunction } from 'express';
import { fetchGptRoute } from '../interface/routes/gptRoute';
const router = express.Router();

//base path
const basePath = '/api';

/* GET home page. */
router.get(basePath, function(_: Request, res: Response) {
  res.render('index', { title: 'StudyApp' });
});

router.use(basePath + '/gpt', fetchGptRoute);

module.exports = router;
