const asyncHandler = require('express-async-handler');
const { companies, users } = require('../../services');

import { Request, Response } from 'express';
import { companyMember, companySignUpBody } from '../../interfaces';

module.exports = {
  post: asyncHandler(async (req: Request, res: Response) => {
    const {
      code,
      coperate_name,
      ispartner,
      business_name,
      eid,
      homepage,
      member,
    } = req.body as companySignUpBody;
    const { position, email, username, password } = member as companyMember;

    let result = await companies.create(
      code,
      coperate_name,
      '',
      ispartner,
      business_name,
      eid,
      homepage,
    );
    if (!result.success) {
      res.status(409).send('Company already exists');
      return;
    }
    const companyid = result.payload.id;

    const userResult = await users.create(email, username, password, companyid, position, '', '');
    if (!userResult.success) {
      res.status(404).send("There's an error while creating user");
      return;
    }

    res.status(200).send('Company successfully created!');
  }),
};
