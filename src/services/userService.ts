const users = require('./access/users');
const { isValid } = require('../utils/token');

import { UserRecord, UserServiceType, Decode } from '../interfaces';

const UserService: UserServiceType = {
  signin: async (emailOrUsername: string, password: string) => {
    let userData: UserRecord | null;

    userData = await users.findByEmail(emailOrUsername);
    if (!userData) {
      userData = await users.findByUsername(emailOrUsername);
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
  },

  signup: async (userData: UserRecord) => {
    const userCreate: string | null = await users.create(userData);
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
  },

  findByToken: async (token: string) => {
    const decode: Decode = await isValid(token);
    if (!decode.isValid) {
      return {
        success: false,
        payload: null,
        message: 'login required',
      };
    }
    const { email, password } = decode.userData;

    console.log('before finding user');

    const userData: UserRecord | null = await users.findByEmail(email);

    console.log('after finding user', userData);

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
  },

  checkEmail: async (email: string) => {
    const findRecord: UserRecord | null = await users.findByEmail(email);

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
  },
};

module.exports = UserService;
