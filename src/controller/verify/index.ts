import { Result, UserRecord } from '../../interfaces';

const asyncHandler = require('express-async-handler');

import { Request, Response } from 'express';
const { userService } = require('../../services');

module.exports = {
  get: asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.cookies;

    let resBody: any = {
      token: false,
      join_type: 'developer',
    };

    const userResult: Result = await userService.findByToken(token);
    if (userResult.success) {
      resBody.token = true;
    }
    if (userResult.payload.company_id) {
      resBody.join_type = 'company';
    }

    res.status(200).send(resBody);
  }),
  post: asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.cookies;

    let userData: UserRecord | null = null;

    const userResult: Result = await userService.findByToken(token);
    if (userResult.success) {
      userData = userResult.payload;
      delete userData.password;
    }

    if (userData) {
      res.status(200).send({ userData });
    } else {
      res.status(200).send({ isLogin: false });
    }
  }),
};
