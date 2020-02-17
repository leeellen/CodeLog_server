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
const { postings, tags } = require('../../services');
module.exports = {
    get: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const findresult = yield postings.find(id);
        if (!findresult.success) {
            res.status(404).send("i can't find your postings");
            return;
        }
        let postingInfo = findresult.payload;
        const tagfindresult = yield tags.findNamesByPostId(id);
        if (!tagfindresult.success) {
            res.status(404).send("i found your postings, but i can't find posting tags");
            return;
        }
        postingInfo['tags'] = tagfindresult.payload;
        res.status(200).send(postingInfo);
    })),
};
