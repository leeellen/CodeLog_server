export interface Result {
  success: boolean;
  payload: any;
  message: string;
}

export interface Decode {
  isValid: boolean;
  token: string | undefined;
  userData: {
    id: string;
  };
}

export interface userSignInBody {
  email?: string;
  username?: string;
  password: string;
}

export interface userSignUpBody {
  email: string;
  username: string;
  password: string;
  companyid: string;
  position: string;
  completion: string;
  website: string;
}

export interface companyMember {
  position: string;
  email?: string;
  username?: string;
  password: string;
}

export interface companySignUpBody {
  code: string;
  coperate_name: string;
  ispartner: boolean;
  business_name: string;
  eid: string;
  homepage: string;
  member: companyMember;
}

export interface companySignInBody {
  company_code: string;
  email?: string;
  username?: string;
  password: string;
}

export interface UserServiceType {
  signin: (emailOrUsername: string, password: string) => Promise<Result>;
  signup: (userRecord: UserRecord) => Promise<Result>;
  checkEmail: (email: string) => Promise<Result>;
}

export interface UserRecord {
  email: string;
  username: string;
  password: string;
  companyid: number;
  position: string;
  website: string;
}

export interface PostingServiceType {}

export interface PostingRecord {
  title: string;
  likes: number;
  content: string | TILContent | TechContent | DevContent;
  theme: string;
  userid: number;
}

export interface TILContent {
  fact: string;
  feeling: string;
  finding: string;
  futureAction: string;
}

export interface TechContent {
  concept: string;
  background: string;
  definition: string;
  example: string;
  precautions: string;
  recommend: string;
}

export interface DevContent {
  concept: string;
  strategy: string;
  difficulty: string;
  reference: string;
  lesson: string;
}
