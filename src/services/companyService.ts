const { postings, types, subtitles, contents } = require('./access');

import {
  CompanyRecord,
  CompanyServiceType,
  TypeRecord,
  SubtitleRecord,
  ContentRecord,
} from '../interfaces';

const CompanyService: CompanyServiceType = {
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
};
