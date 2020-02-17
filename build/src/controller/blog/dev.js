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
const { postings } = require('../../services');
module.exports = {
    get: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { token } = req.cookies;
        let decodeData = yield isValid(token);
        if (!decodeData.isValid) {
            res.status(403).send('login required');
            return;
        }
        const userid = decodeData.userData.id;
        let posts = {};
        const findResult = yield postings.findDev(userid);
        if (!findResult.success) {
            res.status(404).send(`There's an error while finding your posts`);
            return;
        }
        posts['posts'] = findResult.payload;
        res.status(200).send(posts);
    })),
};
