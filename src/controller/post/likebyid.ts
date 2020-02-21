import { Result, PostingRecord } from '../../interfaces';

const asyncHandler = require('express-async-handler');

import { Request, Response } from 'express';
const { isValid } = require('../../utils/token');
const { userService, postingService } = require('../../services');

module.exports = {
  post: asyncHandler(async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const { token } = req.cookies;

    const userResult: Result = await userService.findByToken(token);
    if (!userResult.success) {
      res.status(403).send('login required');
      return;
    }
    const user_id: number = userResult.payload.id;

    const findresult: Result = await postingService.find(id);
    if (!findresult.success) {
      res.status(404).send("i can't find your postings");
      return;
    }

    if (findresult.payload.user_id === user_id) {
      res.status(403).send("You can't like yourself");
      return;
    }

    const likeResult: Result = await postingService.like(id);
    if (!likeResult.success) {
      res.status(404).send("There's an error while liking");
      return;
    }

    res.status(200).send('successfully liked');
  }),
  delete: asyncHandler(async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const { token } = req.cookies;

    const userResult: Result = await userService.findByToken(token);
    if (!userResult.success) {
      res.status(403).send('login required');
      return;
    }
    const user_id: number = userResult.payload.id;

    const findresult: Result = await postingService.find(id);
    if (!findresult.success) {
      res.status(404).send("i can't find your postings");
      return;
    }

    if (findresult.payload.user_id === user_id) {
      res.status(403).send("can't like your posting");
      return;
    }

    const unlikeResult: Result = await postingService.unlike(id);
    if (!unlikeResult.success) {
      res.status(404).send("There's an error while unliking");
      return;
    }

    res.status(200).send('successfully unliked');
  }),
};
