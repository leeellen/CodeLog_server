const asyncHandler = require('express-async-handler');

import { Request, Response } from 'express';
import { TagRecord } from '../../interfaces';
const { tags } = require('../../services/access');

module.exports = {
  get: asyncHandler(async (req: Request, res: Response) => {
    const getTagResult = await tags.getAllTags();
    if (!getTagResult) {
      res.status(404).send("There's an error while finding tags");
      return;
    }
    res.status(200).send({
      tags: getTagResult.map((el: TagRecord) => el.name),
    });
  }),
};
