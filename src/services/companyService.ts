const { users, companies, postings, types, subtitles, contents } = require('./access');
const userService = require('./userService');

import {
  CompanyRecord,
  CompanyServiceType,
  TypeRecord,
  SubtitleRecord,
  ContentRecord,
  UserRecord,
  Result,
} from '../interfaces';

const CompanyService: CompanyServiceType = {
  signin: async (company_code: string, emailOrUsername: string, password: string) => {
    const signinResult: Result = await userService.signin(emailOrUsername, password);
    if (!signinResult.success) {
      return {
        success: false,
        payload: null,
        message: signinResult.message,
      };
    }
    let company_id: number = signinResult.payload.company_id;
    if (!company_id) {
      return {
        success: false,
        payload: null,
        message: "you don't have company",
      };
    }

    const companyData: CompanyRecord = await companies.find(company_id);

    if (companyData.code !== company_code) {
      return {
        success: false,
        payload: null,
        message: 'wrong code',
      };
    }

    return {
      success: true,
      payload: null,
      message: 'found user',
    };
  },

  signup: async (companyData: CompanyRecord) => {
    const companyCreate: CompanyRecord | null = await companies.create(companyData);

    console.log('company', companyCreate);
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

    const memberCreate = await userService.signup(member);

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
