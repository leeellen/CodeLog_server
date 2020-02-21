const asyncHandler = require('express-async-handler');
const { tokenGenerator } = require('../../utils/token');
const { userService } = require('../../services');

import { Request, Response } from 'express';
import { Result, userSignInBody } from '../../interfaces';

module.exports = {
  post: asyncHandler(async (req: Request, res: Response) => {
    const { email, username, password } = req.body as userSignInBody;
    const emailOrUsername: string | undefined = email || username;

    const userData: Result = await userService.signin(emailOrUsername, password);

    if (!userData.success) {
      res.status(404).send(`User with ${emailOrUsername} doesn't exist`);
      return;
    }

    if (!userData.payload) {
      res.status(403).send(`wrong password`);
      return;
    }

    const token: string = await tokenGenerator({
      email: userData.payload.email,
      password: userData.payload.password,
    });

    res
      .cookie('token', token)
      .status(200)
      .send('Token generated');
  }),
};
