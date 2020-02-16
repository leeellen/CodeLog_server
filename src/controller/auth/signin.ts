const asyncHandler = require('express-async-handler');
const { tokenGenerator } = require('../../utils/token');

import { Request, Response } from 'express';
import { users } from '../../services';
import { Result, userSignInBody } from '../../interfaces';

module.exports = {
  post: asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body as userSignInBody;

    let userData: Result = await users.find(email, password);
    if (!userData.success) {
      res.status(404).send(`User with ${email} doesn't exist`);
      return;
    }
    if (!userData.payload) {
      res.status(403).send(`wrong password`);
      return;
    }

    let token: string = await tokenGenerator({ id: userData.payload.id });

    res
      .cookie('token', token)
      .status(200)
      .send('Token generated');
  }),
};
