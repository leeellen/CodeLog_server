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
const { companies, users } = require('../../services');
module.exports = {
    post: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { code, coperate_name, ispartner, business_name, eid, homepage, member, } = req.body;
        const { position, email, username, password } = member;
        let result = yield companies.create(code, coperate_name, '', ispartner, business_name, eid, homepage);
        if (!result.success) {
            res.status(409).send('Company already exists');
            return;
        }
        const companyid = result.payload.id;
        const userResult = yield users.create(email, username, password, companyid, position, '', '');
        if (!userResult.success) {
            res.status(404).send("There's an error while creating user");
            return;
        }
        res.status(200).send('Company successfully created!');
    })),
};
