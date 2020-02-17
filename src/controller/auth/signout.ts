import { Request, Response } from 'express';

module.exports = {
  post: (req: Request, res: Response) => {
    res
      .clearCookie('token')
      .status(200)
      .send('ok');
  },
};
