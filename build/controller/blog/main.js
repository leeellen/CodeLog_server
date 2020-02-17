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
const { postings } = require('../../services');
const { isValid } = require('../../utils/token');
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
        for (let el of ['Plain', 'TIL', 'Tech', 'Dev']) {
            const findResult = yield postings['find' + el](userid);
            if (!findResult.success) {
                res.status(404).send(`There's an error while finding your ${el} posts`);
                return;
            }
            posts[el.toLowerCase() + '_posts'] = findResult.payload;
        }
        res.status(200).send(posts);
    })),
};
