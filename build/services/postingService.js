var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { users, companies, postings, types, subtitles, contents, tags } = require('./access');
function handleData(postData) {
    postData.theme = postData.Type.name;
    delete postData.Type;
    let cobj = {};
    for (let content of postData.Contents) {
        cobj[content.Subtitle.name] = content.body;
    }
    postData.content = cobj;
    delete postData.Contents;
    let tagArr = [];
    for (let ptcon of postData.postings_tags) {
        tagArr.push(ptcon.Tag.name);
    }
    postData.selected_tags = tagArr;
    delete postData.postings_tags;
    return postData;
}
function handleDatas(postDatas) {
    return postDatas.map((postData) => handleData(postData));
}
const postingService = {
    create: (postingData) => __awaiter(void 0, void 0, void 0, function* () {
        const typeData = yield types.findByName(postingData.theme);
        if (!typeData) {
            return {
                success: false,
                payload: null,
                message: "can't find theme",
            };
        }
        postingData.type_id = typeData.id;
        const postCreate = yield postings.create(postingData);
        if (!postCreate) {
            return {
                success: false,
                payload: null,
                message: 'error occurred',
            };
        }
        const post_id = postCreate.id;
        const subtDatas = yield subtitles.findByTypeid(typeData.id);
        for (let subtitle of subtDatas) {
            const { name, id } = subtitle;
            console.log(1000, subtitle, id);
            const content = postingData.content[name];
            const contentCreate = yield contents.create(post_id, id, content);
            if (!contentCreate) {
                const postDelete = yield postings.delete(post_id);
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
    }),
    find: (post_id) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('before find');
        let postRecord = yield postings.findById(post_id);
        console.log(postRecord);
        if (!postRecord) {
            return {
                success: false,
                payload: null,
                message: "can't find post",
            };
        }
        let postData = handleData(postRecord);
        const userData = yield users.findById(postData.user_id);
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
    }),
    getHome: () => __awaiter(void 0, void 0, void 0, function* () {
        let data = {};
        let newPostDatas = yield postings.findByNew(10);
        if (!newPostDatas) {
            return {
                success: false,
                payload: null,
                message: "can't find new posts",
            };
        }
        data.new_post = handleDatas(newPostDatas);
        let ManyLikePostDatas = yield postings.findByManyLike(10);
        if (!ManyLikePostDatas) {
            return {
                success: false,
                payload: null,
                message: "can't find recommended posts",
            };
        }
        data.recommended_post = handleDatas(ManyLikePostDatas);
        let newCompanies = yield companies.findByNew(10);
        if (!newCompanies) {
            return {
                success: false,
                payload: null,
                message: "can't find companies",
            };
        }
        data.new_companies = newCompanies;
        return {
            success: true,
            payload: data,
            message: 'success',
        };
    }),
    findByUser: (user_id) => __awaiter(void 0, void 0, void 0, function* () {
        let blogPostDatas = {};
        const typeDatas = yield types.findAll();
        if (!typeDatas) {
            return {
                success: false,
                payload: null,
                message: "can't find types",
            };
        }
        for (let typeData of typeDatas) {
            let themePostDatas = yield postings.findByUserTheme(user_id, typeData.id);
            if (!themePostDatas) {
                return {
                    success: false,
                    payload: null,
                    message: "can't find post",
                };
            }
            blogPostDatas[typeData.name + '_posts'] = handleDatas(themePostDatas);
        }
        return {
            success: true,
            payload: blogPostDatas,
            message: 'all posts found',
        };
    }),
    addTags: (post_id, selected_tags) => __awaiter(void 0, void 0, void 0, function* () {
        let tagDatas = [];
        for (let tag_name of selected_tags) {
            const findTag = yield tags.findByName(tag_name);
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
        const addTag = yield tags.addAllTags(tagDatas);
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
    }),
    like: (post_id) => __awaiter(void 0, void 0, void 0, function* () {
        const likeResult = yield postings.increaseLike(post_id);
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
    }),
    unlike: (post_id) => __awaiter(void 0, void 0, void 0, function* () {
        const unLikeResult = yield postings.decreaseLike(post_id);
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
    }),
    update: (user_id, postingData) => __awaiter(void 0, void 0, void 0, function* () {
        const { id, title, content } = postingData;
        const postData = yield postings.findById(id);
        if (!postData) {
            return {
                success: false,
                payload: null,
                message: "can't find post",
            };
        }
        if (postData.user_id !== user_id) {
            return {
                success: false,
                payload: null,
                message: 'it is not your post',
            };
        }
        const contentDatas = yield contents.findByPostId(id);
        if (!contentDatas) {
            return {
                success: false,
                payload: null,
                message: "can't find content",
            };
        }
        for (let element of contentDatas) {
            if (element.Subtitle.name in content) {
                element.body = content[element.Subtitle.name];
                const updateContents = yield contents.update(element);
                if (!updateContents) {
                    return {
                        success: false,
                        payload: null,
                        message: 'fail to update',
                    };
                }
            }
        }
        const deleteTags = yield tags.deleteByPostId(id);
        const updateTitles = yield postings.updateTitleById(id, title);
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
    }),
    delete: (post_id) => __awaiter(void 0, void 0, void 0, function* () {
        const deleteTags = yield tags.deleteByPostId(post_id);
        const deleteContents = yield contents.deleteByPostId(post_id);
        const deleteResult = yield postings.delete(post_id);
        return {
            success: true,
            payload: deleteResult,
            message: 'deleted',
        };
    }),
    test: (id) => __awaiter(void 0, void 0, void 0, function* () {
        let contentDatas = yield contents.findByPostId(id);
        return {
            success: true,
            payload: contentDatas,
            message: 'deleted',
        };
    }),
};
module.exports = postingService;
