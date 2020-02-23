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
const { userService } = require('../../services');
module.exports = {
    get: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { token } = req.cookies;
        let resBody = {
            token: false,
        };
        const decode = yield isValid(token);
        if (decode.isValid) {
            resBody.token = true;
            resBody.join_type = decode.userData.user_type;
        }
        res.status(200).send(resBody);
    })),
    post: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { token } = req.cookies;
        let userData = null;
        const userResult = yield userService.findByToken(token);
        if (userResult.success) {
            userData = userResult.payload;
            delete userData.password;
        }
        if (userData) {
            res.status(200).send({ userData });
        }
        else {
            res.status(200).send({ isLogin: false });
        }
    })),
};
