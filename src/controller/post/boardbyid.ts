const asyncHandler = require('express-async-handler');

import { Request, Response } from 'express';
const { postingService, userService } = require('../../services');

import { Result, PostingRecord } from '../../interfaces';

module.exports = {
  get: asyncHandler(async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const { token } = req.cookies;

    const findresult: Result = await postingService.find(id);
    if (!findresult.success) {
      res.status(404).send("i can't find your postings");
      return;
    }
    let postingInfo: PostingRecord = findresult.payload;

    if (token) {
      const userResult: Result = await userService.findByToken(token);
      if (!userResult.success) {
        res.status(403).send('login required');
        return;
      }
      const user_id = userResult.payload.id;

      postingInfo.isAuthor = postingInfo.user_id === user_id;
    }
    res.status(200).send(postingInfo);
  }),
  delete: asyncHandler(async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const { token } = req.cookies;

    const userResult: Result = await userService.findByToken(token);
    if (!userResult.success) {
      res.status(403).send('login required');
      return;
    }
    const user_id = userResult.payload.id;
    console.log(user_id);

    const postingInfo: Result = await postingService.find(id);
    if (!postingInfo.success) {
      res.status(404).send("i can't find your postings");
      return;
    }

    if (postingInfo.payload.user_id !== user_id) {
      console.log(postingInfo.payload);
      res.status(403).send('It is not your posting');
      return;
    }

    const deleteResult: Result = await postingService.delete(id);
    if (!deleteResult.success) {
      res.status(404).send("There's an error while deleting your posting");
      return;
    }

    res.status(200).send('successfully deleted');
  }),
};
