const asyncHandler = require('express-async-handler');
const { tokenGenerator } = require('../../utils/token');
const { users, companies } = require('../../services');

import { Request, Response } from 'express';
import { Result, companySignInBody } from '../../interfaces';

module.exports = {
  post: asyncHandler(async (req: Request, res: Response) => {
    const { company_code, email, username, password } = req.body as companySignInBody;

    const userData: Result = await users.find(email, password);
    if (!userData.success) {
      res.status(404).send(`User with ${email} doesn't exist`);
      return;
    }
    if (!userData.payload) {
      res.status(403).send(`wrong password`);
      return;
    }

    const companyData: Result = await companies.find(userData.payload.companyid);
    if (!companyData.success) {
      res.status(404).send(`User doesn't have company`);
      return;
    }
    if (company_code !== companyData.payload.code) {
      res.status(403).send(`companycode doesn't match`);
      return;
    }

    const token: string = await tokenGenerator({ id: userData.payload.id });

    res
      .cookie('token', token)
      .status(200)
      .send('Token generated');
  }),
};
