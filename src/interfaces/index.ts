export interface Result {
  success: boolean;
  payload: any;
  message: string;
}

export interface Decode {
  isValid: boolean;
  token: string | undefined;
  userData: {
    email: string;
    password: string;
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
  company_id: string;
  position: string;
  certificate: string;
  personal_homepage: string;
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
  partner: boolean;
  business_name: string;
  eid: string;
  company_homepage: string;
  member: companyMember;
}

export interface companySignInBody {
  company_code: string;
  email?: string;
  username?: string;
  password: string;
}

export interface UserRecord {
  id?: number;
  email: string;
  username: string;
  password: string;
  company_id: number | null;
  position: string;
  certificate: string;
  personal_homepage: string;
}

export interface PostingUserRecord {
  email: string;
  username: string;
  position: string;
  certificate: string;
}

export interface PostingRecord {
  id?: number;
  title: string;
  likes?: number;
  content: any;
  theme: string;
  type_id?: number;
  user_id?: number;
  user?: PostingUserRecord;
  selected_tags?: Array<string> | Array<TagRecord>;
  isAuthor?: boolean;
}

export interface CompanyRecord {
  id?: number;
  company_code: string;
  company_name: string;
  info: string;
  partner: boolean;
  business_name: string;
  eid: string;
  company_homepage: string;
  member?: UserRecord;
}

export interface TILContent {
  fact?: string;
  feeling?: string;
  finding?: string;
  futureAction?: string;
}

export interface TechContent {
  concept?: string;
  background?: string;
  definition?: string;
  example?: string;
  precautions?: string;
  recommend?: string;
}

export interface DevContent {
  concept?: string;
  strategy?: string;
  difficulty?: string;
  reference?: string;
  lesson?: string;
}

export interface TypeRecord {
  id: number;
  name: string;
}

export interface PTRecord {
  post_id: number;
  tag_id: number;
}

export interface SubtitleRecord {
  id: number;
  name: string;
  typeid: number;
}

export interface ContentRecord {
  id: number;
  post_id: number;
  subtitle_id: number;
  body: string;
}

export interface TagRecord {
  id: number;
  name: string;
}

export interface UserServiceType {
  signin: (emailOrUsername: string, password: string) => Promise<Result>;
  signup: (userRecord: UserRecord) => Promise<Result>;
  update: (userRecord: UserRecord) => Promise<Result>;
  checkEmail: (email: string) => Promise<Result>;
  findByToken: (token: string) => Promise<Result>;
}

export interface PostingServiceType {
  create: (postingData: PostingRecord) => Promise<Result>;
  find: (post_id: number) => Promise<Result>;
  like: (post_id: number) => Promise<Result>;
  unlike: (post_id: number) => Promise<Result>;
  findByUser: (user_id: number) => Promise<Result>;
  getHome: () => Promise<Result>;
  addTags: (post_id: number, selected_tags: Array<string>) => Promise<Result>;
  update: (user_id: number, postingData: PostingRecord) => Promise<Result>;
  delete: (post_id: number) => Promise<Result>;
  test: (id: number) => Promise<Result>;
}

export interface CompanyServiceType {}

export interface TagServiceType {}
