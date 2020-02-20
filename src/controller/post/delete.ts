const asyncHandler = require('express-async-handler');

const { isValid } = require('../../utils/token');
const { userService, postingService } = require('../../services');

import { Request, Response } from 'express';
import { Decode, Result } from '../../interfaces';

module.exports = {
  post: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.body;
    const { token } = req.cookies;

    const userResult: Result = await userService.findByToken(token);
    if (!userResult.success) {
      res.status(403).send('login required');
      return;
    }
    const userid = userResult.payload.id;

    const postingInfo: Result = await postingService.find(id);
    if (!postingInfo.success) {
      res.status(404).send("i can't find your postings");
      return;
    }

    if (postingInfo.payload.userid !== userid) {
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
