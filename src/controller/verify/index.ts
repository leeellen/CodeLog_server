import { Result, PostingRecord, UserRecord } from '../../interfaces';

const asyncHandler = require('express-async-handler');

import { Request, Response } from 'express';
const { isValid } = require('../../utils/token');
const { userService, postingService } = require('../../services');

module.exports = {
  get: asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.cookies;

    let isLogin: Boolean = false;

    const userResult: Result = await userService.findByToken(token);
    if (userResult.success) {
      isLogin = true;
    }

    res.status(200).send({ isLogin });
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
