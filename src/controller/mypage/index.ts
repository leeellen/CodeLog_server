const asyncHandler = require('express-async-handler');

import { Request, Response } from 'express';
const { userService, postingService } = require('../../services');

import { Result, UserRecord } from '../../interfaces';

module.exports = {
  get: asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.cookies;

    const userResult: Result = await userService.findByToken(token);
    if (!userResult.success) {
      res.status(403).send('login required');
      return;
    }
    let userData = userResult.payload;

    const postingResult: Result = await postingService.findBlog(userData.id);
    if (!postingResult.success) {
      res.status(404).send(postingResult.message);
      return;
    }

    let post_count: number = 0;
    let tags: any = {};
    let themePosts: any;

    for (themePosts of Object.values(postingResult.payload)) {
      post_count += themePosts.length;
      themePosts.map((themePost: any) => {
        if (themePost.selected_tags.length !== 0) {
          themePost.selected_tags.map((el: string) => {
            tags[el] = 1;
          });
        }
      });
    }
    tags = Object.keys(tags);
    userData.post_count = post_count;
    userData.tag_count = tags.length;
    userData.tags = tags;

    res.status(200).send(userData);
  }),

  put: asyncHandler(async (req: Request, res: Response) => {
    const userUpdateData: UserRecord = req.body;
    const { token } = req.cookies;

    const userResult: Result = await userService.findByToken(token);
    if (!userResult.success) {
      res.status(403).send('login required');
      return;
    }
    let userData = userResult.payload;

    if (userUpdateData.email !== userData.email) {
      res.status(404).send("can't update email");
      return;
    }

    const userUpdateResult: Result = await userService.update(userUpdateData);
    if (!userUpdateResult.success) {
      res.status(404).send(userUpdateResult.message);
      return;
    }

    res.status(200).send(userUpdateResult.payload);
  }),
};
