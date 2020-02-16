const asyncHandler = require('express-async-handler');

import { Request, Response } from 'express';
const { isValid } = require('../../utils/token');
const { postings, tags } = require('../../services');

import { Result, Decode } from '../../interfaces';

interface body {
  theme: string;
  title: string;
  content: string;
  selected_tags: Array<string>;
}

module.exports = {
  post: asyncHandler(async (req: Request, res: Response) => {
    const { theme, title, content, selected_tags } = req.body as body;
    const { token } = req.cookies;

    let decodeData: Decode = await isValid(token);
    if (!decodeData.isValid) {
      res.status(403).send('login required');
      return;
    }
    const userid: string = decodeData.userData.id;

    const postresult: Result = await postings.create(userid, title, content, 0, theme);
    if (!postresult.success) {
      res.status(404).send("i can't upload your postings");
      return;
    }
    const postid: string = postresult.payload.id;

    let tagids: Array<Number> = [];
    for (let i = 0; i < selected_tags.length; i++) {
      const findresult: Result = await tags.findByName(selected_tags[i]);
      if (!findresult.success) {
        res
          .status(404)
          .send("i saved your postings, but i can't find your tag " + selected_tags[i]);
        return;
      }
      tagids.push(findresult.payload.id);
    }

    const addresult: Result = await postings.addTags(postid, tagids);
    if (!addresult.success) {
      res.status(404).send("i saved your postings, but i can't put your tags in");
      return;
    }

    res.status(201).send('Posting successfully created!');
  }),
  get: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.body;

    const findresult: Result = await postings.find(id);
    if (!findresult.success) {
      res.status(404).send("i can't find your postings");
      return;
    }
    let postingInfo: Object = findresult.payload;

    let tagfindresult: Result = await tags.findNamesByPostId(id);
    if (!tagfindresult.success) {
      res.status(404).send("i found your postings, but i can't find posting tags");
      return;
    }
    postingInfo['tags'] = tagfindresult.payload;
    res.status(200).send(postingInfo);
  }),
};
