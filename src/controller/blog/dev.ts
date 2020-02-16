const asyncHandler = require('express-async-handler');
const { postings } = require('../../services');
const { isValid } = require('../../utils/token');

import { Request, Response } from 'express';

interface Decode {
  isValid: boolean;
  token: string | undefined;
  userData: {
    id: string;
  };
}

interface Result {
  success: boolean;
  payload: any;
  message: string;
}

module.exports = {
  get: asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.cookies;

    let decodeData: Decode = await isValid(token);
    if (!decodeData.isValid) {
      res.status(403).send('login required');
      return;
    }
    const userid: string = decodeData.userData.id;

    let posts: Object = {};
    const findResult: Result = await postings.findDev(userid);
    if (!findResult.success) {
      res.status(404).send(`There's an error while finding your posts`);
      return;
    }
    posts['posts'] = findResult.payload;

    res.status(200).send(posts);
  }),
};
