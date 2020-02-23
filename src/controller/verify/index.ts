import { Result, UserRecord, Decode } from '../../interfaces';

const asyncHandler = require('express-async-handler');
const { isValid } = require('../../utils/token');

import { Request, Response } from 'express';
const { userService } = require('../../services');

module.exports = {
  get: asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.cookies;

    let resBody: any = {
      token: false,
    };

    const decode: Decode = await isValid(token);
    if (decode.isValid) {
      resBody.token = true;

      resBody.join_type = decode.userData.user_type;
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
