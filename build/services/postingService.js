var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { users, postings, types, subtitles, contents } = require('./access');
function handleDatas(newPostDatas) {
    return newPostDatas.map((postData) => {
        let obj = {};
        for (let content of postData.Contents) {
            obj[content.Subtitle.name] = content.body;
        }
        postData.content = obj;
        delete postData.Contents;
        return postData;
    });
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
        let postData = yield postings.findById(post_id);
        console.log(postData);
        if (!postData) {
            return {
                success: false,
                payload: null,
                message: "can't find post",
            };
        }
        const userData = yield users.findById(postData.user_id);
        if (userData) {
            postData.user = {
                email: userData.email,
                username: userData.username,
                position: userData.position,
                certificate: userData.certificate,
            };
        }
        const typeData = yield types.findById(postData.type_id);
        if (!typeData) {
            return {
                success: false,
                payload: null,
                message: "can't find type",
            };
        }
        postData.theme = typeData.name;
        const subtDatas = yield subtitles.findByTypeid(postData.type_id);
        const contentDatas = yield contents.findByPostId(postData.id);
        if (contentDatas.length === 0 || !subtDatas) {
            return {
                success: false,
                payload: null,
                message: "can't put contents",
            };
        }
        let content = {};
        for (let subtitle of subtDatas) {
            const { name, id } = subtitle;
            content[name] = contentDatas.filter((el) => el.subtitle_id === id)[0].body;
        }
        postData.content = content;
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
                message: 'successnot',
            };
        }
        data.new_post = handleDatas(newPostDatas);
        let ManyLikePostDatas = yield postings.findByManyLike(10);
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
    }),
    findByTheme: (user_id, theme) => __awaiter(void 0, void 0, void 0, function* () {
        const postDatas = yield postings.findByUserTheme(user_id, theme);
        if (!postDatas) {
            return {
                success: false,
                payload: null,
                message: "can't find posts",
            };
        }
        const typeData = yield types.findByName(theme);
        if (!typeData) {
            return {
                success: false,
                payload: null,
                message: "can't find type",
            };
        }
        const subtDatas = yield subtitles.findByTypeid(postData.type_id);
        const contentDatas = yield contents.findByPostId(postData.id);
        if (contentDatas.length === 0 || !subtDatas) {
            return {
                success: false,
                payload: null,
                message: "can't put contents",
            };
        }
        let content = {};
        for (let subtitle of subtDatas) {
            const { name, id } = subtitle;
            content[name] = contentDatas.filter((el) => el.subtitle_id === id)[0].body;
        }
        postData.content = content;
        return {
            success: true,
            payload: postDatas,
            message: 'successfully found',
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
    update: (postingData) => __awaiter(void 0, void 0, void 0, function* () {
        const { id, title, content } = postingData;
        let contentDatas = yield contents.findByPostId(id);
        for (let [key, value] of Object.entries(content)) {
            if (contentDatas[key]) {
                contentDatas[key] = value;
            }
        }
        const updateContents = yield contents.update(contentDatas);
        if (!updateContents) {
            return {
                success: false,
                payload: null,
                message: 'fail to update',
            };
        }
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
            payload: updateContents,
            message: 'post updated',
        };
    }),
    delete: (post_id) => __awaiter(void 0, void 0, void 0, function* () {
        const deleteContents = yield contents.deleteByPostId(post_id);
        const deleteResult = yield postings.delete(post_id);
        return {
            success: true,
            payload: deleteResult,
            message: 'deleted',
        };
    }),
};
module.exports = postingService;
