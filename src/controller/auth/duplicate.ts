const asyncHandler = require('express-async-handler');

import { Request, Response } from 'express';
import { users } from '../../services';
import { Result } from '../../interfaces';

module.exports = {
  post: asyncHandler(async (req: Request, res: Response) => {
    const email: string = req.body.email;

    const re: RegExp = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!re.test(String(email).toLowerCase())) {
      res.status(200).send('It is not email');
    }

    let userResult: Result = await users.find(email, null);
    if (userResult.success) {
      res.status(200).send(`This email has already joined`);
      return;
    }

    res.status(200).send(`This email is usable!`);
  }),
};
