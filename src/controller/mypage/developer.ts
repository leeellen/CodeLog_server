const asyncHandler = require('express-async-handler');

import { Request, Response } from 'express';
const { isValid } = require('../../utils/token');
const { users, postings, tags } = require('../../services');

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
    let userData: Object = findUserResult.payload;

    const findPostingsResult: Result = await postings.findAll(findUserResult.payload.id);
    if (!findPostingsResult.success) {
      res.status(404).send(`There's an error while finding your postings`);
      return;
    }
    userData['post_count'] = findPostingsResult.payload.length;

    let tagNames: Array<string> = [];
    for (let posting of findPostingsResult.payload) {
      let findTagResult: Result = await tags.findNamesByPostId(posting.id);
      if (!findTagResult.success) {
        res.status(404).send(`There's an error while finding your posting tags`);
        return;
      }
      tagNames = tagNames.concat(findTagResult.payload);
    }
    userData['tags'] = tagNames.filter((v, i) => tagNames.indexOf(v) === i);

    res.status(200).send(userData);
  }),
};
