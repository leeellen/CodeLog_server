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
import { users } from '../../services';
module.exports = {
    post: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, username, password, companyid, position, completion, website, } = req.body;
        let result = yield users.create(email, username, password, companyid, position, completion, website);
        if (!result.success) {
            if (result.message === 'duplicated') {
                res.status(409).send('User already exists');
            }
            else {
                res.sendStatus(500);
            }
        }
        res.status(200).send('User successfully created!');
    })),
};
