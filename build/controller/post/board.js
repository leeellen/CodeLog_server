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
const { userService, postingService } = require('../../services');
module.exports = {
    post: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const postingData = req.body;
        const { token } = req.cookies;
        const userResult = yield userService.findByToken(token);
        if (!userResult.success) {
            res.status(403).send('login required');
            return;
        }
        postingData.user_id = userResult.payload.id;
        const postresult = yield postingService.create(postingData);
        if (!postresult.success) {
            res.status(404).send("i can't upload your postings");
            return;
        }
        res.status(201).send('Posting successfully created!');
    })),
    get: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.body;
        const findresult = yield postingService.find(id);
        if (!findresult.success) {
            res.status(404).send("i can't find your postings");
            return;
        }
        let postingInfo = findresult.payload;
        // let tagfindresult: Result = await tags.findNamesByPostId(id);
        // if (!tagfindresult.success) {
        //   res.status(404).send("i found your postings, but i can't find posting tags");
        //   return;
        // }
        // postingInfo['tags'] = tagfindresult.payload;
        res.status(200).send(postingInfo);
    })),
    put: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const postingData = req.body;
        const { token } = req.cookies;
        const userResult = yield userService.findByToken(token);
        if (!userResult.success) {
            res.status(403).send('login required');
            return;
        }
        postingData.user_id = userResult.payload.id;
        const updateResult = yield postingService.update(postingData);
        if (!updateResult.success) {
            res.status(404).send("i can't update your postings");
            return;
        }
        res.status(201).send('Posting successfully updated!');
    })),
    delete: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.body;
        const { token } = req.cookies;
        const userResult = yield userService.findByToken(token);
        if (!userResult.success) {
            res.status(403).send('login required');
            return;
        }
        const user_id = userResult.payload.id;
        console.log(user_id);
        const postingInfo = yield postingService.find(id);
        if (!postingInfo.success) {
            res.status(404).send("i can't find your postings");
            return;
        }
        if (postingInfo.payload.user_id !== user_id) {
            console.log(postingInfo.payload);
            res.status(403).send('It is not your posting');
            return;
        }
        const deleteResult = yield postingService.delete(id);
        if (!deleteResult.success) {
            res.status(404).send("There's an error while deleting your posting");
            return;
        }
        res.status(200).send('successfully deleted');
    })),
};
