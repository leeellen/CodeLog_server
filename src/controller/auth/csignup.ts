const asyncHandler = require('express-async-handler');
const { companyService } = require('../../services');

import { Request, Response } from 'express';
import { CompanyRecord } from '../../interfaces';

module.exports = {
  post: asyncHandler(async (req: Request, res: Response) => {
    const companyData: CompanyRecord = req.body;

    let result = await companyService.signup(companyData);
    if (!result.success) {
      res.status(409).send(result.message);
      return;
    }
    console.log(result.payload);
    const company_id = result.payload.id;

    res.status(200).send({
      company_id,
      message: 'Company successfully created!',
    });
  }),
};
