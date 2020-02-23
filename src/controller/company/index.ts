const asyncHandler = require('express-async-handler');

import { Request, Response } from 'express';
const { userService, companyService } = require('../../services');

import { Result, CompanyRecord } from '../../interfaces';

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

    companyData.Users = companyData.Users.map((user: any) => {
      if (user.id === userData.payload.id) {
        user.dataValues.isUser = true;
      }
      return user;
    });

    const developerDatas = await companyService.findDeveloper(companyData.id);
    if (!developerDatas.success) {
      res.status(404).send(`There's an error while finding developers`);
      return;
    }

    companyData.recommended_developers = developerDatas.payload;

    res.status(200).send(companyData);
  }),

  put: asyncHandler(async (req: Request, res: Response) => {
    const companyUpdateData: CompanyRecord = req.body;
    const { company_tags } = companyUpdateData;
    const { token } = req.cookies;

    const userResult: Result = await userService.findByToken(token);
    console.log(userResult);
    if (!userResult.success) {
      res.status(403).send('login required');
      return;
    }
    if (userResult.payload.company_id !== companyUpdateData.id) {
      res.status(403).send("you're not company user");
      return;
    }

    const companyUpdateResult: Result = await companyService.update(companyUpdateData);

    if (!companyUpdateResult.success) {
      res.status(404).send(companyUpdateResult.message);
      return;
    }

    const company_id = companyUpdateData.id;

    const updateTagResult: Result = await companyService.addTags(company_id, company_tags);
    if (!updateTagResult.success) {
      res.status(404).send(updateTagResult.message);
      return;
    }

    res.status(200).send('Company successfully updated');
  }),
  member: require('./member'),
  memberbyid: require('./memberbyid'),
};
