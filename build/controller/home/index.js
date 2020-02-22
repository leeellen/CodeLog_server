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
const { userService, postingService } = require('../../services');
module.exports = {
    get: asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { token } = req.cookies;
        const homeResult = yield postingService.getHome();
        if (!homeResult.success) {
            res.status(404).send(homeResult.message);
            return;
        }
        let homeData = homeResult.payload;
        const userResult = yield userService.findByToken(token);
        if (!userResult.success) {
            res.status(403).send('login required');
            return;
        }
        if (userResult.payload.company_id) {
            homeData.isCompanyUser = true;
        }
        res.status(200).send(homeResult.payload);
    })),
};
