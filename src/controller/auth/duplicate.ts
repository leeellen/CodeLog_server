const asyncHandler = require('express-async-handler');
const { userService } = require('../../services');

import { Request, Response } from 'express';
import { Result } from '../../interfaces';

module.exports = {
  post: asyncHandler(async (req: Request, res: Response) => {
    const email: string = req.body.email;

    let statusCode = 200;
    let message = '';

    const re: RegExp = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!re.test(String(email).toLowerCase())) {
      statusCode = 400;
      message = 'it is not email';
    } else {
      const checkEmail: Result = await userService.checkEmail(email);
      if (!checkEmail.success) {
        statusCode = 409;
        message = 'already joined';
      } else {
        message = `This email is usable!`;
      }
    }

    res.status(statusCode).send(message);
  }),
};
