const { users, postings, types, subtitles, contents, tags } = require('./access');

import {
  PostingRecord,
  PostingServiceType,
  TypeRecord,
  SubtitleRecord,
  ContentRecord,
  UserRecord,
  PTRecord,
  TagRecord,
} from '../interfaces';

function handleData(postData: any) {
  postData.theme = postData.Type.name;
  delete postData.Type;

  let cobj: any = {};
  for (let content of postData.Contents) {
    cobj[content.Subtitle.name] = content.body;
  }
  postData.content = cobj;
  delete postData.Contents;

  let tagArr: any = [];
  for (let ptcon of postData.postings_tags) {
    tagArr.push(ptcon.Tag.name);
  }
  postData.selected_tags = tagArr;
  delete postData.postings_tags;

  return postData;
}

function handleDatas(postDatas: any) {
  return postDatas.map((postData: any) => handleData(postData));
}

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
      console.log(1000, subtitle, id);
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
    console.log('before find');
    let postRecord: PostingRecord | null = await postings.findById(post_id);
    console.log(postRecord);

    if (!postRecord) {
      return {
        success: false,
        payload: null,
        message: "can't find post",
      };
    }

    let postData = handleData(postRecord);

    const userData: UserRecord | null = await users.findById(postData.user_id);
    if (userData) {
      postData.user = {
        email: userData.email,
        username: userData.username,
        position: userData.position,
        certificate: userData.certificate,
      };
    }
    return {
      success: true,
      payload: postData,
      message: 'successfully found',
    };
  },

  getHome: async () => {
    let data: any = {};
    let newPostDatas: Array<any> | null = await postings.findByNew(10);
    if (!newPostDatas) {
      return {
        success: false,
        payload: null,
        message: 'successnot',
      };
    }

    data.new_post = handleDatas(newPostDatas);

    let ManyLikePostDatas: Array<any> | null = await postings.findByManyLike(10);
    if (!ManyLikePostDatas) {
      return {
        success: false,
        payload: null,
        message: 'successnot',
      };
    }

    data.recommended_post = handleDatas(ManyLikePostDatas);

    return {
      success: true,
      payload: data,
      message: 'success',
    };
  },

  findByUser: async (user_id: number) => {
    let blogPostDatas: any = {};
    const typeDatas: Array<TypeRecord> | null = await types.findAll();
    if (!typeDatas) {
      return {
        success: false,
        payload: null,
        message: "can't find types",
      };
    }
    for (let typeData of typeDatas) {
      let themePostDatas: Array<any> | null = await postings.findByUserTheme(user_id, typeData.id);
      if (!themePostDatas) {
        return {
          success: false,
          payload: null,
          message: 'successnot',
        };
      }

      blogPostDatas[typeData.name + '_posts'] = handleDatas(themePostDatas);
    }

    return {
      success: true,
      payload: blogPostDatas,
      message: 'all posts found',
    };
  },

  addTags: async (post_id: number, selected_tags: Array<String>) => {
    let tagDatas: Array<PTRecord> = [];
    for (let tag_name of selected_tags) {
      const findTag: TagRecord | null = await tags.findByName(tag_name);
      if (!findTag) {
        return {
          success: false,
          payload: null,
          message: "can't find tag",
        };
      }
      tagDatas.push({
        post_id,
        tag_id: findTag.id,
      });
    }

    const addTag = await tags.addAllTags(tagDatas);
    if (!addTag) {
      return {
        success: false,
        payload: null,
        message: "can't put tags in",
      };
    }
    return {
      success: true,
      payload: null,
      message: 'successfully taged',
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

    console.log(content);
    for (let element of contentDatas) {
      if (element.Subtitle.name in content) {
        element.body = content[element.Subtitle.name];
        console.log(element);
        const updateContents = await contents.update(element);
        if (!updateContents) {
          return {
            success: false,
            payload: null,
            message: 'fail to update',
          };
        }
      }
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
      payload: null,
      message: 'post updated',
    };
  },

  delete: async (post_id: number) => {
    const deleteTags: undefined = await tags.deleteByPostId(post_id);

    const deleteContents: undefined = await contents.deleteByPostId(post_id);

    const deleteResult: undefined = await postings.delete(post_id);

    return {
      success: true,
      payload: deleteResult,
      message: 'deleted',
    };
  },

  test: async (id: number) => {
    let contentDatas = await contents.findByPostId(id);

    return {
      success: true,
      payload: contentDatas,
      message: 'deleted',
    };
  },
};

module.exports = postingService;
