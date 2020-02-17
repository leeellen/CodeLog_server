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
const { users } = require('../../services');
module.exports = {
    post: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        const userData = yield users.find(email, password);
        if (!userData.success) {
            res.status(404).send(`User with ${email} doesn't exist`);
            return;
        }
        if (!userData.payload) {
            res.status(403).send(`wrong password`);
            return;
        }
        const token = yield tokenGenerator({ id: userData.payload.id });
        res
            .cookie('token', token)
            .status(200)
            .send('Token generated');
    })),
};
