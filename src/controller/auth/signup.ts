const asyncHandler = require('express-async-handler');
const { userService } = require('../../services');

import { Request, Response } from 'express';
import { Result, UserRecord } from '../../interfaces';

module.exports = {
  post: asyncHandler(async (req: Request, res: Response) => {
    const userData: UserRecord = req.body;

    let statusCode = 200;
    let message = '';

    const signResult: Result = await userService.signup(userData);
    if (!signResult.success) {
      if (signResult.message === 'duplicated') {
        statusCode = 409;
        message = 'User already exists';
      } else {
        statusCode = 500;
      }
    } else {
      message = 'User successfully created!';
    }

    res.status(statusCode).send(message);
  }),
};
