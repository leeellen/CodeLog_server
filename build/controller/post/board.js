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
    post: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const postingData = req.body;
        const { selected_tags } = postingData;
        const { token } = req.cookies;
        const userResult = yield userService.findByToken(token);
        if (!userResult.success) {
            res.status(403).send('login required');
            return;
        }
        postingData.user_id = userResult.payload.id;
        const postResult = yield postingService.create(postingData);
        if (!postResult.success) {
            res.status(404).send(postResult.message);
            return;
        }
        const { id } = postResult.payload;
        const tagResult = yield postingService.addTags(id, selected_tags);
        if (!tagResult.success) {
            res.status(201).send({
                post_id: id,
                message: `it successfully created but can't put tags in"}`,
            });
        }
        res.status(201).send({
            post_id: id,
            message: `it successfully created!`,
        });
    })),
    get: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.body;
        const { token } = req.cookies;
        const findresult = yield postingService.find(id);
        if (!findresult.success) {
            res.status(404).send("i can't find your postings");
            return;
        }
        let postingInfo = findresult.payload;
        if (token) {
            const userResult = yield userService.findByToken(token);
            if (!userResult.success) {
                res.status(403).send('login required');
                return;
            }
            const user_id = userResult.payload.id;
            postingInfo.isAuthor = postingInfo.user_id === user_id;
        }
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
        const user_id = userResult.payload.id;
        const updateResult = yield postingService.update(user_id, postingData);
        if (!updateResult.success) {
            res.status(404).send(updateResult.message);
            return;
        }
        const { id, selected_tags } = postingData;
        const addTagResult = yield postingService.addTags(id, selected_tags);
        if (!addTagResult.success) {
            res.status(404).send(addTagResult.message);
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
        const postingInfo = yield postingService.find(id);
        if (!postingInfo.success) {
            res.status(404).send("i can't find your postings");
            return;
        }
        if (postingInfo.payload.user_id !== user_id) {
            res.status(403).send('It is not your posting');
            return;
        }
        const deleteResult = yield postingService.delete(id);
        if (!deleteResult.success) {
            res.status(404).send(deleteResult.message);
            return;
        }
        res.status(200).send('successfully deleted');
    })),
    test: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.body;
        const postingInfo = yield postingService.test(id);
        if (!postingInfo.success) {
            res.status(404).send("i can't find your postings");
            return;
        }
        res.status(200).send(postingInfo);
    })),
};
