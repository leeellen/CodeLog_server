const asyncHandler = require('express-async-handler');

import { Request, Response } from 'express';
const { isValid } = require('../../utils/token');
const { userService } = require('../../services');

import { Result, Decode } from '../../interfaces';

module.exports = {
  get: asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.cookies;
    const userid: string = userService.findByToken(token);

    const findCompanyResult: Result = await companies.find(companyId);
    if (!findUserResult.success) {
      res.status(404).send(`There's an error while finding your company`);
      return;
    }
    let companyData: any = findCompanyResult.payload;

    const findMemberResult: Result = await users.findByCompany(companyId);
    if (!findMemberResult.success) {
      console.log(findMemberResult.payload);
      res.status(404).send(`There's an error while finding your company's members`);
      return;
    }
    companyData['users'] = findMemberResult.payload;

    res.status(200).send(companyData);
  }),
};
