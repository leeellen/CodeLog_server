const { postings, types, subtitles, contents } = require('./access');

import {
  PostingRecord,
  PostingServiceType,
  TILContent,
  DevContent,
  TechContent,
  TypeRecord,
  SubtitleRecord,
  ContentRecord,
} from '../interfaces';

const postingService: PostingServiceType = {
  create: async (postingData: PostingRecord) => {
    const typeData: TypeRecord | null = await types.findByName(postingData.theme);

    if (!typeData) {
      return {
        success: false,
        payload: null,
        message: "can't find theme",
      };
    }
    postingData.type_id = typeData.id;

    const postCreate: PostingRecord | null = await postings.create(postingData);

    if (!postCreate) {
      return {
        success: false,
        payload: null,
        message: 'error occurred',
      };
    }

    const post_id: number = postCreate.id;

    const subtDatas: Array<SubtitleRecord> | null = await subtitles.findByTypeid(typeData.id);

    for (let subtitle of subtDatas) {
      const { name, id } = subtitle;
      const content = postingData.content[name];

      const contentCreate: ContentRecord | null = await contents.create(post_id, id, content);

      if (!contentCreate) {
        const postDelete = await postings.delete(post_id);

        if (!postDelete) {
          return {
            success: false,
            payload: null,
            message: "can't create content, can't delete post",
          };
        }

        return {
          success: false,
          payload: null,
          message: "can't create content",
        };
      }
    }

    return {
      success: true,
      payload: postCreate,
      message: 'created',
    };
  },

  find: async (post_id: number) => {
    let findPost: PostingRecord | null = await postings.findById(post_id);

    if (!findPost) {
      return {
        success: false,
        payload: null,
        message: "can't find post",
      };
    }

    const typeData: TypeRecord | null = await types.findById(findPost.type_id);
    findPost.theme = typeData.name;

    const subtDatas: Array<SubtitleRecord> | null = await subtitles.findByTypeid(findPost.type_id);

    const contentDatas: Array<ContentRecord> | null = await contents.findByPostId(findPost.id);

    if (!contentDatas) {
      return {
        success: false,
        payload: null,
        message: "can't find contents",
      };
    }

    let content: string | TILContent | DevContent | TechContent = {};

    for (let subtitle of subtDatas) {
      const { name, id } = subtitle;
      content[name] = contentDatas.find((el) => el.subtitle_id === id).body;
    }
    findPost.content = content;

    return {
      success: true,
      payload: findPost,
      message: 'successfully found',
    };
  },

  like: async (post_id: number) => {
    const likeResult: PostingRecord | null = await postings.increaseLike(post_id);
    if (!likeResult) {
      return {
        success: false,
        payload: null,
        message: "There's an error while like",
      };
    }
    return {
      success: true,
      payload: likeResult,
      message: 'post liked',
    };
  },

  unlike: async (post_id: number) => {
    const unLikeResult: PostingRecord | null = await postings.decreaseLike(post_id);
    if (!unLikeResult) {
      return {
        success: false,
        payload: null,
        message: "There's an error while undo like",
      };
    }
    return {
      success: true,
      payload: unLikeResult,
      message: 'post unliked',
    };
  },

  findByUser: async (user_id: number) => {
    const userPosts: Array<PostingRecord> | null = await postings.findByUser(user_id);
    if (!userPosts) {
      return {
        success: false,
        payload: null,
        message: "can't find posts",
      };
    }
    return {
      success: true,
      payload: userPosts,
      message: 'all posts found',
    };
  },

  update: async (postingData: PostingRecord) => {
    return {
      success: false,
      payload: null,
      message: '',
    };
  },

  delete: async (post_id: number) => {
    const deleteContents: any = await contents.deleteByPostId(post_id);
    if (!deleteContents) {
      return {
        success: false,
        payload: null,
        message: 'error occurred',
      };
    }
    const deleteResult: any = await postings.delete(post_id);
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

module.exports = postingService;
