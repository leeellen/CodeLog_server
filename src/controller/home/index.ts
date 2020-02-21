const asyncHandler = require('express-async-handler');

const { postingService } = require('../../services');

import { Request, Response } from 'express';
module.exports = {
  get: asyncHandler(async (req: Request, res: Response) => {
    let posts = await postingService.getHome();
    res.status(200).send(posts.payload);
  }),
};
