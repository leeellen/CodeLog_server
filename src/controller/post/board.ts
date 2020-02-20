const asyncHandler = require('express-async-handler');

import { Request, Response } from 'express';
const { isValid } = require('../../utils/token');
const { userService, postingService } = require('../../services');

import { Result, Decode, PostingRecord } from '../../interfaces';

interface body {
  theme: string;
  title: string;
  content: string;
  selected_tags: Array<string>;
}

module.exports = {
  post: asyncHandler(async (req: Request, res: Response) => {
    const postingData: PostingRecord = req.body;
    const { token } = req.cookies;

    let decode: Decode = await isValid(token);
    if (!decode.isValid) {
      res.status(403).send('login required');
      return;
    }
    const { email, password } = decode.userData;

    const findUser: Result = await userService.signin(email, password);
    postingData.userid = findUser.payload.id;

    const postresult: Result = await postingService.create(postingData);
    if (!postresult.success) {
      res.status(404).send("i can't upload your postings");
      return;
    }

    res.status(201).send('Posting successfully created!');
  }),
  get: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.body;

    const findresult: Result = await postingService.find(id);
    if (!findresult.success) {
      res.status(404).send("i can't find your postings");
      return;
    }
    let postingInfo: Object = findresult.payload;

    // let tagfindresult: Result = await tags.findNamesByPostId(id);
    // if (!tagfindresult.success) {
    //   res.status(404).send("i found your postings, but i can't find posting tags");
    //   return;
    // }
    // postingInfo['tags'] = tagfindresult.payload;
    res.status(200).send(postingInfo);
  }),
};
