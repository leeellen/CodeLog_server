const { users, companies, tags } = require('./access');
const { handleCompanyData } = require('./helper');
const userService = require('./userService');

import {
  CompanyRecord,
  CompanyServiceType,
  TypeRecord,
  SubtitleRecord,
  ContentRecord,
  UserRecord,
  Result,
  CTRecord,
  TagRecord,
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
    } else {
      member.company_id = companyCreate.id || null;
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
    const companyData = await companies.find(company_id);

    if (!companyData) {
      return {
        success: false,
        payload: null,
        message: "can't find company",
      };
    }

    return {
      success: true,
      payload: handleCompanyData(companyData),
      message: 'successfully found',
    };
  },

  update: async (companyData: CompanyRecord) => {
    const companyRecord: CompanyRecord | null = await companies.find(companyData.id);
    if (!companyRecord) {
      return {
        success: false,
        payload: null,
        message: "can't find company",
      };
    }

    const { company_code, partner } = companyData;
    if (company_code || partner) {
      if (companyRecord.company_code !== company_code || companyRecord.partner !== partner) {
        return {
          success: false,
          payload: null,
          message: "can't update code or partner",
        };
      }
    }

    const updateRecord: CompanyRecord | null = await companies.update(companyData);
    if (!updateRecord) {
      return {
        success: false,
        payload: null,
        message: "can't update company",
      };
    }

    const deleteTags: undefined = await tags.deleteByCompanyId(companyData.id);

    return {
      success: true,
      payload: updateRecord,
      message: 'successfully update company',
    };
  },

  addTags: async (company_id: number, company_tags: Array<String>) => {
    let tagDatas: Array<CTRecord> = [];
    for (let tag_name of company_tags) {
      const findTag: TagRecord | null = await tags.findByName(tag_name);
      if (!findTag) {
        return {
          success: false,
          payload: null,
          message: "can't find tag",
        };
      }
      tagDatas.push({
        company_id,
        tag_id: findTag.id,
      });
    }

    const addTag = await tags.addCTTags(tagDatas);
    if (!addTag) {
      return {
        success: false,
        payload: null,
        message: "can't put tags in",
      };
    }
    return {
      success: true,
      payload: null,
      message: 'successfully taged',
    };
  },
};

module.exports = CompanyService;
