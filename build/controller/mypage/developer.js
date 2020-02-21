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
            res.status(404).send('posting not found');
            return;
        }
        userData.post_count = postingResult.payload.length;
        userData.post_titles = postingResult.payload
            .slice(userData.post_count - 10)
            .map((el) => el.title);
        // let tagNames: Array<string> = [];
        // for (let posting of findPostingsResult.payload) {
        //   let findTagResult: Result = await tags.findNamesByPostId(posting.id);
        //   if (!findTagResult.success) {
        //     res.status(404).send(`There's an error while finding your posting tags`);
        //     return;
        //   }
        //   tagNames = tagNames.concat(findTagResult.payload);
        // }
        // userData['tags'] = tagNames.filter((v, i) => tagNames.indexOf(v) === i);
        res.status(200).send(userData);
    })),
};
