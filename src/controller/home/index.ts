const asyncHandler = require('express-async-handler');

const { postingService } = require('../../services');

import { Request, Response } from 'express';
import { Result } from '../../interfaces';
module.exports = {
  get: asyncHandler(async (req: Request, res: Response) => {
    let homeResult: Result = await postingService.getHome();
    if (!homeResult.success) {
      res.status(404).send(homeResult.message);
      return;
    }
    res.status(200).send(homeResult.payload);
  }),
};
