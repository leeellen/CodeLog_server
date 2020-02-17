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
const { postings, tags } = require('../../services');
module.exports = {
    post: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { theme, title, content, selected_tags } = req.body;
        const { token } = req.cookies;
        let decodeData = yield isValid(token);
        if (!decodeData.isValid) {
            res.status(403).send('login required');
            return;
        }
        const userid = decodeData.userData.id;
        const postresult = yield postings.create(userid, title, content, 0, theme);
        if (!postresult.success) {
            res.status(404).send("i can't upload your postings");
            return;
        }
        const postid = postresult.payload.id;
        let tagids = [];
        for (let i = 0; i < selected_tags.length; i++) {
            const findresult = yield tags.findByName(selected_tags[i]);
            if (!findresult.success) {
                res
                    .status(404)
                    .send("i saved your postings, but i can't find your tag " + selected_tags[i]);
                return;
            }
            tagids.push(findresult.payload.id);
        }
        const addresult = yield postings.addTags(postid, tagids);
        if (!addresult.success) {
            res.status(404).send("i saved your postings, but i can't put your tags in");
            return;
        }
        res.status(201).send('Posting successfully created!');
    })),
    get: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.body;
        const findresult = yield postings.find(id);
        if (!findresult.success) {
            res.status(404).send("i can't find your postings");
            return;
        }
        let postingInfo = findresult.payload;
        let tagfindresult = yield tags.findNamesByPostId(id);
        if (!tagfindresult.success) {
            res.status(404).send("i found your postings, but i can't find posting tags");
            return;
        }
        postingInfo['tags'] = tagfindresult.payload;
        res.status(200).send(postingInfo);
    })),
};
