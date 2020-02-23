const asyncHandler = require('express-async-handler');

import { Request, Response } from 'express';
const { userService, companyService } = require('../../services');

import { Result } from '../../interfaces';

module.exports = {
  delete: asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.cookies;
    const id: string = req.params.id;

    const userResult: Result = await userService.findByToken(token);
    if (!userResult.success) {
      res.status(403).send('login required');
      return;
    }

    const findCompanyResult: Result = await companyService.find(userResult.payload.company_id);
    if (!findCompanyResult.success) {
      res.status(404).send(`There's an error while finding your company`);
      return;
    }

    if (userResult.payload.company_id === findCompanyResult.payload.id) {
      const userDeleteResult: Result = await userService.delete(id);

      if (!userDeleteResult.success) {
        res.status(404).send(userDeleteResult.message);
        return;
      }
    } else {
      res.status(404).send('it is not your company');
      return;
    }

    res.status(200).send('Member successfully deleted');
  }),
};
