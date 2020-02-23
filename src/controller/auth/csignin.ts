const asyncHandler = require('express-async-handler');
const { tokenGenerator } = require('../../utils/token');
const { companyService } = require('../../services');

import { Request, Response } from 'express';
import { Result, companySignInBody } from '../../interfaces';

module.exports = {
  post: asyncHandler(async (req: Request, res: Response) => {
    const { company_code, email, username, password } = req.body as companySignInBody;
    const emailOrUsername: string | undefined = email || username;

    const signinResult: Result = await companyService.signin(
      company_code,
      emailOrUsername,
      password,
    );

    if (!signinResult.success) {
      res.status(404).send(signinResult.message);
      return;
    }

    const token: string = await tokenGenerator({
      email: signinResult.payload.email,
      password: signinResult.payload.password,
      user_type: 'company',
    });

    res
      .cookie('token', token)
      .status(200)
      .send({
        message: 'Token generated',
      });
  }),
};
