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
        let userData;
        userData = yield users.findByEmail(emailOrUsername);
        if (!userData) {
            userData = yield users.findByUsername(emailOrUsername);
        }
        if (!userData) {
            return {
                success: false,
                payload: null,
                message: 'unvalid user',
            };
        }
        if (userData.password !== password) {
            return {
                success: true,
                payload: null,
                message: 'wrong password',
            };
        }
        return {
            success: true,
            payload: userData,
            message: 'found user',
        };
    }),
    signup: (companyData) => __awaiter(void 0, void 0, void 0, function* () {
        const companyCreate = yield companies.create(companyData);
        if (!companyCreate) {
            return {
                success: false,
                payload: null,
                message: 'duplicated',
            };
        }
        let member = companyData.member;
        if (!companyData.member) {
            member = {
                email: '',
                username: 'admin',
                password: companyCreate.code,
                company_id: companyCreate.id,
                position: '',
                certificate: '',
                personal_homepage: '',
            };
        }
        else {
            member.company_id = companyCreate.id;
        }
        const memberCreate = userService.signup(member);
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
            payload: null,
            message: 'created',
        };
    }),
    find: (company_id) => __awaiter(void 0, void 0, void 0, function* () {
        const companyData = yield companies.find(company_id);
        console.log(companyData);
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
};
module.exports = CompanyService;
