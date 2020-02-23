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
const { userService, companyService } = require('../../services');
module.exports = {
    get: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { token } = req.cookies;
        const userData = yield userService.findByToken(token);
        const findCompanyResult = yield companyService.find(userData.payload.company_id);
        if (!findCompanyResult.success) {
            res.status(404).send(`There's an error while finding your company`);
            return;
        }
        let companyData = findCompanyResult.payload;
        companyData.Users = companyData.Users.map((user) => {
            if (user.id === userData.payload.id) {
                user.dataValues.isUser = true;
            }
            return user;
        });
        const developerDatas = yield companyService.findDeveloper(companyData.id);
        if (!developerDatas.success) {
            res.status(404).send(`There's an error while finding developers`);
            return;
        }
        companyData.recommended_developers = developerDatas.payload;
        res.status(200).send(companyData);
    })),
    put: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const companyUpdateData = req.body;
        const { company_tags } = companyUpdateData;
        const { token } = req.cookies;
        const userResult = yield userService.findByToken(token);
        console.log(userResult);
        if (!userResult.success) {
            res.status(403).send('login required');
            return;
        }
        if (userResult.payload.company_id !== companyUpdateData.id) {
            res.status(403).send("you're not company user");
            return;
        }
        const companyUpdateResult = yield companyService.update(companyUpdateData);
        if (!companyUpdateResult.success) {
            res.status(404).send(companyUpdateResult.message);
            return;
        }
        const company_id = companyUpdateData.id;
        const updateTagResult = yield companyService.addTags(company_id, company_tags);
        if (!updateTagResult.success) {
            res.status(404).send(updateTagResult.message);
            return;
        }
        res.status(200).send('Company successfully updated');
    })),
    member: require('./member'),
    memberbyid: require('./memberbyid'),
};
