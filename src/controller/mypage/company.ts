const asyncHandler = require('express-async-handler');

import { Request, Response } from 'express';
const { isValid } = require('../../utils/token');
const { companies, users } = require('../../services');

import { Result, Decode } from '../../interfaces';

module.exports = {
  get: asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.cookies;

    let decodeData: Decode = await isValid(token);
    if (!decodeData.isValid) {
      res.status(403).send('login required');
      return;
    }
    const userid: string = decodeData.userData.id;

    const findUserResult: Result = await users.findById(userid);
    if (!findUserResult.success) {
      res
        .clearCookie('token')
        .status(404)
        .send(`I'm not sure what user you logined to. Hmm. I just do logout for you`);
      return;
    }
    const companyId: string = findUserResult.payload.companyid;

    const findCompanyResult: Result = await companies.find(companyId);
    if (!findUserResult.success) {
      res.status(404).send(`There's an error while finding your company`);
      return;
    }
    let companyData: Object = findCompanyResult.payload;

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
