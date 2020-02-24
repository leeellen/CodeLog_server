const asyncHandler = require('express-async-handler');
const { companyService } = require('../../services');

import { Request, Response } from 'express';
import { CompanyRecord, Result } from '../../interfaces';

module.exports = {
  post: asyncHandler(async (req: Request, res: Response) => {
    const companyData: CompanyRecord = req.body;

    const SigninResult: Result = await companyService.signup(companyData);
    if (!SigninResult.success) {
      res.status(409).send(SigninResult.message);
      return;
    }

    const company_id = SigninResult.payload.id;

    res.status(200).send({
      company_id,
      message: 'Company successfully created!',
    });
  }),
};
