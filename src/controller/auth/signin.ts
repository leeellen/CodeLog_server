const asyncHandler = require('express-async-handler');
const { tokenGenerator } = require('../../utils/token');
const { userService } = require('../../services');

import { Request, Response } from 'express';
import { Result, userSignInBody } from '../../interfaces';

module.exports = {
  post: asyncHandler(async (req: Request, res: Response) => {
    const { email, username, password } = req.body as userSignInBody;
    const emailOrUsername = email || username;

    let statusCode = 200;
    let message = '';

    const userData: Result = await userService.signin(emailOrUsername, password);
    if (!userData.success) {
      statusCode = 404;
      message = userData.message;
    } else {
      const token: string = await tokenGenerator({ id: userData.payload.id });
      res.cookie('token', token);
      message = 'Token generated';
    }

    res.status(statusCode).send(message);
  }),
};
