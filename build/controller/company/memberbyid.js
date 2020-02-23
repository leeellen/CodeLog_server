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
    delete: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { token } = req.cookies;
        const id = req.params.id;
        const userResult = yield userService.findByToken(token);
        if (!userResult.success) {
            res.status(403).send('login required');
            return;
        }
        const findCompanyResult = yield companyService.find(userResult.payload.company_id);
        if (!findCompanyResult.success) {
            res.status(404).send(`There's an error while finding your company`);
            return;
        }
        if (userResult.payload.company_id === findCompanyResult.payload.id) {
            const userDeleteResult = yield userService.delete(id);
            if (!userDeleteResult.success) {
                res.status(404).send(userDeleteResult.message);
                return;
            }
        }
        else {
            res.status(404).send('it is not your company');
            return;
        }
        res.status(200).send('Member successfully deleted');
    })),
};
