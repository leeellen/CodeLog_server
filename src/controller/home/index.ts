const asyncHandler = require('express-async-handler');

const { userService, postingService } = require('../../services');

import { Request, Response } from 'express';
import { Result } from '../../interfaces';
module.exports = {
  get: asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.cookies;

    const homeResult: Result = await postingService.getHome();
    if (!homeResult.success) {
      res.status(404).send(homeResult.message);
      return;
    }
    let homeData = homeResult.payload;

    const userResult: Result = await userService.findByToken(token);

    if (userResult.payload.company_id) {
      homeData.isCompanyUser = true;
    }

    res.status(200).send(homeResult.payload);
  }),
};
