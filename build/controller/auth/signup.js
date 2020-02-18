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
const { userService } = require('../../services');
module.exports = {
    post: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userData = req.body;
        let statusCode = 200;
        let message = '';
        const signResult = yield userService.signup(userData);
        if (!signResult.success) {
            if (signResult.message === 'duplicated') {
                statusCode = 409;
                message = 'User already exists';
            }
            else {
                statusCode = 500;
            }
        }
        else {
            message = 'User successfully created!';
        }
        res.status(statusCode).send(message);
    })),
};
