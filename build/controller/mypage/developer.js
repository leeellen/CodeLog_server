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
const { isValid } = require('../../utils/token');
const { users, postings, tags } = require('../../services');
module.exports = {
    get: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { token } = req.cookies;
        let decodeData = yield isValid(token);
        if (!decodeData.isValid) {
            res.status(403).send('login required');
            return;
        }
        const userid = decodeData.userData.id;
        const findUserResult = yield users.findById(userid);
        if (!findUserResult.success) {
            res
                .clearCookie('token')
                .status(404)
                .send(`I'm not sure what user you logined to. Hmm. I just do logout for you`);
            return;
        }
        let userData = findUserResult.payload;
        const findPostingsResult = yield postings.findAll(findUserResult.payload.id);
        if (!findPostingsResult.success) {
            res.status(404).send(`There's an error while finding your postings`);
            return;
        }
        userData['post_count'] = findPostingsResult.payload.length;
        let tagNames = [];
        for (let posting of findPostingsResult.payload) {
            let findTagResult = yield tags.findNamesByPostId(posting.id);
            if (!findTagResult.success) {
                res.status(404).send(`There's an error while finding your posting tags`);
                return;
            }
            tagNames = tagNames.concat(findTagResult.payload);
        }
        userData['tags'] = tagNames.filter((v, i) => tagNames.indexOf(v) === i);
        res.status(200).send(userData);
    })),
};
