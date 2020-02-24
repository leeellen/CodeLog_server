const users = require('./access/users');
const { isValid } = require('../utils/token');
const postingService = require('./postingService');

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

  update: async (userRecord: UserRecord) => {
    const updateRecord: UserRecord | null = await users.updateByEmail(userRecord);
    if (!updateRecord) {
      return {
        success: false,
        payload: null,
        message: "can't update user",
      };
    }

    return {
      success: true,
      payload: updateRecord,
      message: 'successfully update user',
    };
  },

  updatebyId: async (userRecord: UserRecord) => {
    const updateRecord: UserRecord | null = await users.updateById(userRecord);
    if (!updateRecord) {
      return {
        success: false,
        payload: null,
        message: "can't update user",
      };
    }

    return {
      success: true,
      payload: updateRecord,
      message: 'successfully update user',
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

    const userData: UserRecord | null = await users.findByEmail(email);

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

  delete: async (user_id: number) => {
    const userPostResult = await postingService.findByUser(user_id);
    if (!userPostResult.success) {
      return {
        success: false,
        payload: null,
        message: "can't find posts",
      };
    }

    for (let userPost of userPostResult.payload) {
      const deletePostResult = await postingService.delete(userPost.id);
      if (!deletePostResult.success) {
        return {
          success: false,
          payload: null,
          message: "can't delete post",
        };
      }
    }

    const deleteResult: undefined = await users.delete(user_id);

    return {
      success: true,
      payload: null,
      message: 'deleted',
    };
  },
};

module.exports = UserService;
