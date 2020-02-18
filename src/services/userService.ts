const users = require('./access/users');

import { UserRecord, UserServiceType } from '../interfaces';

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
        success: false,
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

    if (userCreate === 'duplicated') {
      return {
        success: false,
        payload: null,
        message: 'duplicated',
      };
    } else if (userCreate === 'created') {
      return {
        success: true,
        payload: null,
        message: 'created',
      };
    }

    return {
      success: false,
      payload: null,
      message: userCreate,
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
    } else {
      return {
        success: false,
        payload: null,
        message: 'duplicated',
      };
    }
  },
};

module.exports = UserService;
