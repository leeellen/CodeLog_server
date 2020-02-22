var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const asyncHandler = require('express-async-handler');
const { userService, postingService } = require('../../services');
module.exports = {
    get: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { token } = req.cookies;
        const userResult = yield userService.findByToken(token);
        if (!userResult.success) {
            res.status(403).send('login required');
            return;
        }
        let userData = userResult.payload;
        const postingResult = yield postingService.findByUser(userData.id);
        if (!postingResult.success) {
            res.status(404).send(postingResult.message);
            return;
        }
        let post_count = 0;
        let tags = {};
        let themePosts;
        for (themePosts of Object.values(postingResult.payload)) {
            post_count += themePosts.length;
            themePosts.map((themePost) => {
                if (themePost.selected_tags.length !== 0) {
                    themePost.selected_tags.map((el) => {
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
    })),
};
