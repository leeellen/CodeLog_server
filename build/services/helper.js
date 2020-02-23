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
module.exports = {
    handlePromise: (promise) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield promise;
            if (typeof res === 'string') {
                return res;
            }
            if (res === null) {
                return null;
            }
            const data = Array.isArray(res) ? res.map((el) => el.dataValues) : res.dataValues;
            return data;
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }),
    handlePostData: (postData) => {
        postData.theme = postData.Type.name;
        delete postData.Type;
        let cobj = {};
        for (let content of postData.Contents) {
            cobj[content.Subtitle.name] = content.body;
        }
        postData.content = cobj;
        delete postData.Contents;
        let tagArr = [];
        for (let ptcon of postData.postings_tags) {
            tagArr.push(ptcon.Tag.name);
        }
        postData.selected_tags = tagArr;
        delete postData.postings_tags;
        return postData;
    },
    handlePostDatas: (postDatas) => {
        return postDatas.map((postData) => {
            postData.theme = postData.Type.name;
            delete postData.Type;
            let cobj = {};
            for (let content of postData.Contents) {
                cobj[content.Subtitle.name] = content.body;
            }
            postData.content = cobj;
            delete postData.Contents;
            let tagArr = [];
            for (let ptcon of postData.postings_tags) {
                tagArr.push(ptcon.Tag.name);
            }
            postData.selected_tags = tagArr;
            delete postData.postings_tags;
            return postData;
        });
    },
    handleCompanyData: (companyData) => {
        let ctagArr = [];
        for (let ctag of companyData.companies_tags) {
            ctagArr.push(ctag.Tag.name);
        }
        companyData.company_tags = ctagArr;
        delete companyData.companies_tags;
        return companyData;
    },
    handleCompanyDatas: (companyDatas) => {
        return companyDatas.map((companyData) => {
            let ctagArr = [];
            for (let ctag of companyData.companies_tags) {
                ctagArr.push(ctag.Tag.name);
            }
            companyData.company_tags = ctagArr;
            delete companyData.companies_tags;
            return companyData;
        });
    },
    handleTagDatas: (Tags) => {
        let obj = {};
        Tags.map((tag) => {
            tag.Tag.dataValues.postings_tags.map((post) => {
                if (post.Posting.user_id in obj) {
                    obj[post.Posting.user_id]++;
                }
                else {
                    obj[post.Posting.user_id] = 1;
                }
            });
        });
        console.log(obj);
        return Object.entries(obj).sort((a, b) => b[1] - a[1]);
    },
};
