const asyncHandler = require('express-async-handler');
const { userService } = require('../../services');

import { Request, Response } from 'express';
import { Result, UserRecord } from '../../interfaces';

module.exports = {
  post: asyncHandler(async (req: Request, res: Response) => {
    const userData: UserRecord = req.body;

    const result: Result = await userService.signup(userData);
    if (!result.success) {
      if (result.message === 'duplicated') {
        res.status(409).send('User already exists');
        return;
      } else {
        res.sendStatus(500);
        return;
      }
    }

    res.status(200).send('User successfully created!');
  }),
};
