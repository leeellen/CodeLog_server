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
        const id = req.params.id;
        const { token } = req.cookies;
        const userResult = yield userService.findByToken(token);
        if (!userResult.success) {
            res.status(403).send('login required');
            return;
        }
        const user_id = userResult.payload.id;
        const findresult = yield postingService.find(id);
        if (!findresult.success) {
            res.status(404).send("i can't find your postings");
            return;
        }
        if (findresult.payload.user_id === user_id) {
            res.status(403).send("You can't like yourself");
            return;
        }
        const likeResult = yield postingService.like(id);
        if (!likeResult.success) {
            res.status(404).send("There's an error while liking");
            return;
        }
        res.status(200).send('successfully liked');
    })),
    delete: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const { token } = req.cookies;
        const userResult = yield userService.findByToken(token);
        if (!userResult.success) {
            res.status(403).send('login required');
            return;
        }
        const user_id = userResult.payload.id;
        const findresult = yield postingService.find(id);
        if (!findresult.success) {
            res.status(404).send("i can't find your postings");
            return;
        }
        if (findresult.payload.user_id === user_id) {
            res.status(403).send("can't like your posting");
            return;
        }
        const unlikeResult = yield postingService.unlike(id);
        if (!unlikeResult.success) {
            res.status(404).send("There's an error while unliking");
            return;
        }
        res.status(200).send('successfully unliked');
    })),
};
