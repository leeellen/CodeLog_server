const asyncHandler = require('express-async-handler');
const { users } = require('../../services');

import { Request, Response } from 'express';
import { Result, userSignUpBody } from '../../interfaces';

module.exports = {
  post: asyncHandler(async (req: Request, res: Response) => {
    const {
      email,
      username,
      password,
      companyid,
      position,
      completion,
      website,
    } = req.body as userSignUpBody;

    let result: Result = await users.create(
      email,
      username,
      password,
      companyid,
      position,
      completion,
      website,
    );
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
