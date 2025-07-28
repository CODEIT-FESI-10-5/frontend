export interface SignupRequestApi {
  nickname: string;
  email: string;
  password: string;
}
export interface LoginRequestApi {
  email: string;
  password: string;
}
export interface LoginResponseApi {
  httpStatusCode: number;
  data: {
    email: string;
    nickname: string;
    profileImg: string;
  };
}
