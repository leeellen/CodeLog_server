const asyncHandler = require('express-async-handler');
const { userService, postingService } = require('../../services');

import { Request, Response } from 'express';
import { Result } from '../../interfaces';

module.exports = {
  get: asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.cookies;

    const userResult: Result = await userService.findByToken(token);
    if (!userResult.success) {
      res.status(403).send('login required');
      return;
    }
    let userData = userResult.payload;

    let blogPostDatas: any = await postingService.findBlog(userData.id);

    res.status(200).send(blogPostDatas.payload);
  }),
};
