const asyncHandler = require('express-async-handler');

import { Request, Response } from 'express';
const { userService, companyService } = require('../../services');

import { Result, Decode, UserRecord } from '../../interfaces';

module.exports = {
  get: asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.cookies;

    const userData: Result = await userService.findByToken(token);

    const findCompanyResult: Result = await companyService.find(userData.payload.company_id);
    if (!findCompanyResult.success) {
      res.status(404).send(`There's an error while finding your company`);
      return;
    }

    let companyData: any = findCompanyResult.payload;

    res.status(200).send(companyData);
  }),
};
