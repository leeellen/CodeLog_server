const postings = require('./access/postings');

import { PostingRecord, PostingServiceType } from '../interfaces';

const PostingService: PostingServiceType = {
  create: async (postingData: PostingRecord) => {
    const createResult: PostingRecord | null = await postings.create(postingData);
    if (!createResult) {
      return {
        success: false,
        payload: null,
        message: 'error occurred',
      };
    }
    return {
      success: true,
      payload: createResult,
      message: 'created',
    };
  },

  delete: async (postid: number) => {
    const deleteResult: Response | null = await postings.delete(postid);
    console.log(deleteResult);
    if (!deleteResult) {
      return {
        success: false,
        payload: null,
        message: 'error occurred',
      };
    }
    return {
      success: true,
      payload: deleteResult,
      message: 'deleted',
    };
  },
};

module.exports = PostingService;
