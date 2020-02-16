const asyncHandler = require('express-async-handler');

import { Request, Response } from 'express';
const { isValid } = require('../../utils/token');
const { postings } = require('../../services');

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
    for (let el of ['Plain', 'TIL', 'Tech', 'Dev']) {
      const findResult: Result = await postings['find' + el](userid);
      if (!findResult.success) {
        res.status(404).send(`There's an error while finding your ${el} posts`);
        return;
      }
      posts[el.toLowerCase() + '_posts'] = findResult.payload;
    }

    res.status(200).send(posts);
  }),
};
