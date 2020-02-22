var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { users, companies, postings, types, subtitles, contents } = require('./access');
const userService = require('./userService');
const CompanyService = {
    signin: (company_code, emailOrUsername, password) => __awaiter(void 0, void 0, void 0, function* () {
        const signinResult = yield userService.signin(emailOrUsername, password);
        if (!signinResult.success) {
            return {
                success: false,
                payload: null,
                message: signinResult.message,
            };
        }
        let company_id = signinResult.payload.company_id;
        if (!company_id) {
            return {
                success: false,
                payload: null,
                message: "you don't have company",
            };
        }
        const companyData = yield companies.find(company_id);
        if (companyData.company_code !== company_code) {
            return {
                success: false,
                payload: null,
                message: 'wrong code',
            };
        }
        return {
            success: true,
            payload: signinResult.payload,
            message: 'found user',
        };
    }),
    signup: (companyData) => __awaiter(void 0, void 0, void 0, function* () {
        const companyCreate = yield companies.create(companyData);
        console.log('company', companyCreate);
        if (!companyCreate) {
            return {
                success: false,
                payload: null,
                message: 'duplicated',
            };
        }
        let member = companyData.member;
        if (!member) {
            member = {
                email: '',
                username: 'admin',
                password: companyCreate.company_code,
                company_id: companyCreate.id || null,
                position: '',
                certificate: '',
                personal_homepage: '',
            };
        }
        else {
            member.company_id = companyCreate.id || null;
        }
        const memberCreate = yield userService.signup(member);
        if (!memberCreate.success) {
            const companyDelete = companies.delete(companyCreate.id);
            if (!companyDelete) {
                return {
                    success: true,
                    payload: null,
                    message: "can't join member",
                };
            }
            return {
                success: false,
                payload: null,
                message: 'wrong member info',
            };
        }
        return {
            success: true,
            payload: companyCreate,
            message: 'successfully created',
        };
    }),
    find: (company_id) => __awaiter(void 0, void 0, void 0, function* () {
        const companyData = yield companies.find(company_id);
        if (!companyData) {
            return {
                success: false,
                payload: null,
                message: "can't find company",
            };
        }
        return {
            success: true,
            payload: companyData,
            message: 'successfully found',
        };
    }),
    update: (user_id, companyData) => __awaiter(void 0, void 0, void 0, function* () {
        const updateRecord = yield companies.updateByEmail(companyData);
        if (!updateRecord) {
            return {
                success: false,
                payload: null,
                message: "can't update company",
            };
        }
        return {
            success: true,
            payload: null,
            message: 'successfully update company',
        };
    }),
};
module.exports = CompanyService;
