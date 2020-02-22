var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const users = require('./access/users');
const { isValid } = require('../utils/token');
const UserService = {
    signin: (emailOrUsername, password) => __awaiter(void 0, void 0, void 0, function* () {
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
    signup: (userData) => __awaiter(void 0, void 0, void 0, function* () {
        const userCreate = yield users.create(userData);
        console.log(userCreate);
        if (userCreate === 'duplicated') {
            return {
                success: false,
                payload: null,
                message: 'duplicated',
            };
        }
        if (userCreate === 'created') {
            return {
                success: true,
                payload: null,
                message: 'created',
            };
        }
        return {
            success: false,
            payload: null,
            message: String(userCreate),
        };
    }),
    findByToken: (token) => __awaiter(void 0, void 0, void 0, function* () {
        const decode = yield isValid(token);
        if (!decode.isValid) {
            return {
                success: false,
                payload: null,
                message: 'login required',
            };
        }
        const { email, password } = decode.userData;
        const userData = yield users.findByEmail(email);
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
            message: 'id found',
        };
    }),
    checkEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        const findRecord = yield users.findByEmail(email);
        if (!findRecord) {
            return {
                success: true,
                payload: null,
                message: 'not duplicated',
            };
        }
        return {
            success: false,
            payload: null,
            message: 'duplicated',
        };
    }),
};
module.exports = UserService;
