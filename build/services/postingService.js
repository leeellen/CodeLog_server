var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const postings = require('./access/postings');
const PostingService = {
    create: (postingData) => __awaiter(void 0, void 0, void 0, function* () {
        const createResult = yield postings.create(postingData);
        if (!createResult) {
            return {
                success: false,
                payload: null,
                message: 'error occurred',
            };
        }
        return {
            success: true,
            payload: createResult,
            message: 'created',
        };
    }),
    delete: (postid) => __awaiter(void 0, void 0, void 0, function* () {
        const deleteResult = yield postings.delete(postid);
        console.log(deleteResult);
        if (!deleteResult) {
            return {
                success: false,
                payload: null,
                message: 'error occurred',
            };
        }
        return {
            success: true,
            payload: deleteResult,
            message: 'deleted',
        };
    }),
};
module.exports = PostingService;
