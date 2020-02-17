"use strict";
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
const { postings, tags } = require('../../services');
module.exports = {
    post: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.body;
        const { token } = req.cookies;
        let decodeData = yield isValid(token);
        if (!decodeData.isValid) {
            res.status(403).send('login required');
            return;
        }
        const userid = decodeData.userData.id;
        let findresult = yield postings.find(id);
        if (!findresult.success) {
            res.status(404).send("i can't find your postings");
            return;
        }
        let postingInfo = findresult.payload;
        if (postingInfo.userid !== userid) {
            res.status(403).send('It is not your posting');
            return;
        }
        let deleteResult = yield postings.delete(id);
        if (!deleteResult.success) {
            res.status(404).send("There's an error while updating your posting");
            return;
        }
        res.status(200).send('successfully deleted');
    })),
};
