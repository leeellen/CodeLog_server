const { users, postings, types, subtitles, contents } = require('./access');

import {
  PostingRecord,
  PostingServiceType,
  TypeRecord,
  SubtitleRecord,
  ContentRecord,
  UserRecord,
} from '../interfaces';
import { Certificate } from 'crypto';

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

    const post_id: number | undefined = postCreate.id;

    const subtDatas: Array<SubtitleRecord> = await subtitles.findByTypeid(typeData.id);

    for (let subtitle of subtDatas) {
      const { name, id } = subtitle;
      const content: string = postingData.content[name];

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
    let postData: PostingRecord | null = await postings.findById(post_id);
    console.log(postData);

    if (!postData) {
      return {
        success: false,
        payload: null,
        message: "can't find post",
      };
    }

    const userData: UserRecord | null = await users.findById(postData.user_id);
    if (userData) {
      postData.user = {
        email: userData.email,
        username: userData.username,
        position: userData.position,
        certificate: userData.certificate,
      };
    }

    const typeData: TypeRecord | null = await types.findById(postData.type_id);
    if (!typeData) {
      return {
        success: false,
        payload: null,
        message: "can't find type",
      };
    }
    postData.theme = typeData.name;

    const subtDatas: Array<SubtitleRecord> | null = await subtitles.findByTypeid(postData.type_id);

    const contentDatas: Array<ContentRecord> = await contents.findByPostId(postData.id);

    if (contentDatas.length === 0 || !subtDatas) {
      return {
        success: false,
        payload: null,
        message: "can't put contents",
      };
    }

    let content: any = {};

    for (let subtitle of subtDatas) {
      const { name, id } = subtitle;
      content[name] = contentDatas.filter((el: ContentRecord) => el.subtitle_id === id)[0].body;
    }
    postData.content = content;

    return {
      success: true,
      payload: postData,
      message: 'successfully found',
    };
  },

  getHome: async () => {},

  findByTheme: async (user_id: number, theme: string) => {
    const postDatas: Array<PostingRecord> | null = await postings.findByUserTheme(user_id, theme);
    if (!postDatas) {
      return {
        success: false,
        payload: null,
        message: "can't find posts",
      };
    }
    const typeData: TypeRecord | null = await types.findByName(theme);
    if (!typeData) {
      return {
        success: false,
        payload: null,
        message: "can't find type",
      };
    }
    const subtDatas: Array<SubtitleRecord> | null = await subtitles.findByTypeid(postData.type_id);

    const contentDatas: Array<ContentRecord> = await contents.findByPostId(postData.id);

    return {
      success: true,
      payload: postDatas,
      message: 'successfully found',
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

  update: async (postingData: PostingRecord) => {
    const { id, title, content } = postingData;

    let contentDatas = await contents.findByPostId(id);

    for (let [key, value] of Object.entries(content)) {
      if (contentDatas[key]) {
        contentDatas[key] = value;
      }
    }

    const updateContents = await contents.update(contentDatas);
    if (!updateContents) {
      return {
        success: false,
        payload: null,
        message: 'fail to update',
      };
    }

    const updateTitles = await postings.updateTitleById(id, title);
    if (!updateTitles) {
      return {
        success: false,
        payload: null,
        message: 'fail to update title',
      };
    }

    return {
      success: true,
      payload: updateContents,
      message: 'post updated',
    };
  },

  delete: async (post_id: number) => {
    const deleteContents: undefined = await contents.deleteByPostId(post_id);

    const deleteResult: undefined = await postings.delete(post_id);

    return {
      success: true,
      payload: deleteResult,
      message: 'deleted',
    };
  },
};

module.exports = postingService;
