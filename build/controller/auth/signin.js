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
        let statusCode = 200;
        let message = '';
        const userData = yield userService.signin(emailOrUsername, password);
        if (!userData.success) {
            statusCode = 404;
            message = userData.message;
        }
        else {
            const token = yield tokenGenerator({ id: userData.payload.id });
            res.cookie('token', token);
            message = 'Token generated';
        }
        res.status(statusCode).send(message);
    })),
};
