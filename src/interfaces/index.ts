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
  email: string;
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
  email: string;
  username: string;
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
