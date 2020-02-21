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
const { companyService } = require('../../services');
module.exports = {
    post: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const companyData = req.body;
        let result = yield companyService.signup(companyData);
        if (!result.success) {
            res.status(409).send(result.message);
            return;
        }
        console.log(result.payload);
        const company_id = result.payload.id;
        res.status(200).send({
            company_id,
            message: 'Company successfully created!',
        });
    })),
};
