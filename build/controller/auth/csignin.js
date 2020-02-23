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
const { companyService } = require('../../services');
module.exports = {
    post: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { company_code, email, username, password } = req.body;
        const emailOrUsername = email || username;
        const signinResult = yield companyService.signin(company_code, emailOrUsername, password);
        if (!signinResult.success) {
            res.status(404).send(signinResult.message);
            return;
        }
        const token = yield tokenGenerator({
            email: signinResult.payload.email,
            password: signinResult.payload.password,
            user_type: 'company',
        });
        res
            .cookie('token', token)
            .status(200)
            .send({
            message: 'Token generated',
        });
    })),
};
