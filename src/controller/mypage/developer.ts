const asyncHandler = require('express-async-handler');

import { Request, Response } from 'express';
const { userService, postingService } = require('../../services');

import { Result, Decode, UserRecord, PostingRecord } from '../../interfaces';

module.exports = {
  get: asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.cookies;

    const userResult: Result = await userService.findByToken(token);
    if (!userResult.success) {
      res.status(403).send('login required');
      return;
    }
    let userData = userResult.payload;
    console.log(userData);

    const postingResult: Result = await postingService.findByUser(userData.id);
    if (!postingResult.success) {
      res.status(404).send('posting not found');
      return;
    }
    userData.post_count = postingResult.payload.length;
    userData.post_titles = postingResult.payload
      .slice(userData.post_count - 10)
      .map((el: PostingRecord) => el.title);
    // let tagNames: Array<string> = [];
    // for (let posting of findPostingsResult.payload) {
    //   let findTagResult: Result = await tags.findNamesByPostId(posting.id);
    //   if (!findTagResult.success) {
    //     res.status(404).send(`There's an error while finding your posting tags`);
    //     return;
    //   }
    //   tagNames = tagNames.concat(findTagResult.payload);
    // }
    // userData['tags'] = tagNames.filter((v, i) => tagNames.indexOf(v) === i);

    res.status(200).send(userData);
  }),
};
