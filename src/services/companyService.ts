const { users, companies, postings, types, subtitles, contents } = require('./access');
const userService = require('./userService');

import {
  CompanyRecord,
  CompanyServiceType,
  TypeRecord,
  SubtitleRecord,
  ContentRecord,
  UserRecord,
} from '../interfaces';

const CompanyService: CompanyServiceType = {
  signin: async (company_code: string, emailOrUsername: string, password: string) => {
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

  signup: async (companyData: CompanyRecord) => {
    const companyCreate: CompanyRecord | null = await companies.create(companyData);

    if (!companyCreate) {
      return {
        success: false,
        payload: null,
        message: 'duplicated',
      };
    }

    let member: UserRecord | undefined = companyData.member;
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
    } else {
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
  },

  find: async (company_id: number) => {
    const companyData: CompanyRecord | null = await companies.find(company_id);
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
  },
};

module.exports = CompanyService;
