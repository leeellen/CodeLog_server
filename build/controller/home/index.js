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
const { postings, companies } = require('../../services');
module.exports = {
    get: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let posts = {
            new_post: [],
            recommended_post: [],
            new_company: [],
        };
        let userid = 105;
        while (posts.new_post.length < 10) {
            const findResult = yield postings.find(userid);
            if (findResult.success) {
                posts.new_post.push(findResult.payload);
            }
            userid--;
        }
        for (let i = 0; i < 10; i++) {
            const findResult = yield postings.find(Math.floor(Math.random() * 14) + 1);
            if (findResult.success) {
                posts.recommended_post.push(findResult.payload);
            }
        }
        let companyid = 20;
        while (posts.new_company.length < 10) {
            const findResult = yield companies.find(companyid);
            if (findResult.success) {
                posts.new_company.push(findResult.payload);
            }
            companyid--;
        }
        res.status(200).send(posts);
    })),
};
