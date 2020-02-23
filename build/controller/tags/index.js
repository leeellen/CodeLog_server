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
const { tags } = require('../../services/access');
module.exports = {
    get: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const getTagResult = yield tags.getPTTags();
        if (!getTagResult) {
            res.status(404).send("There's an error while finding tags");
            return;
        }
        res.status(200).send({
            tags: getTagResult.map((el) => el.name),
        });
    })),
};
