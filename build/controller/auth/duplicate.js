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
        const email = req.body.email;
        const re = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (!re.test(String(email).toLowerCase())) {
            res.status(400).send('It is not email');
        }
        let userResult = yield userService.checkEmail(email);
        if (!userResult.success) {
            res.status(400).send(`This email has already joined`);
            return;
        }
        res.status(200).send(`This email is usable!`);
    })),
};
