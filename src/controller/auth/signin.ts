const asyncHandler = require('express-async-handler');
const { tokenGenerator } = require('../../utils/token');
const { users } = require('../../services');

import { Request, Response } from 'express';
import { Result, userSignInBody } from '../../interfaces';

module.exports = {
  post: asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body as userSignInBody;

    const userData: Result = await users.find(email, password);
    if (!userData.success) {
      res.status(404).send(`User with ${email} doesn't exist`);
      return;
    }
    if (!userData.payload) {
      res.status(403).send(`wrong password`);
      return;
    }

    const token: string = await tokenGenerator({ id: userData.payload.id });

    res
      .cookie('token', token)
      .status(200)
      .send('Token generated');
  }),
};
