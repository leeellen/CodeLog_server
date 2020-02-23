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
const { tokenGenerator } = require('../../utils/token');
const { userService } = require('../../services');
module.exports = {
    post: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, username, password } = req.body;
        const emailOrUsername = email || username;
        const userData = yield userService.signin(emailOrUsername, password);
        if (!userData.success) {
            res.status(404).send(`User with ${emailOrUsername} doesn't exist`);
            return;
        }
        if (!userData.payload) {
            res.status(403).send(`wrong password`);
            return;
        }
        const token = yield tokenGenerator({
            email: userData.payload.email,
            password: userData.payload.password,
            user_type: 'developer',
        });
        let resBody = { message: 'Token generated' };
        if (userData.payload.company_id) {
            resBody.isCompanyUser = true;
        }
        res
            .cookie('token', token)
            .status(200)
            .send(resBody);
    })),
};
