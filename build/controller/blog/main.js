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
        let blogPostDatas = yield postingService.findByUser(userData.id);
        res.status(200).send(blogPostDatas.payload);
    })),
};
