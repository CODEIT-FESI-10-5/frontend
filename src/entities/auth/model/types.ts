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
  userId: number;
  name: string;
  email: string;
  nickname: string;
  accessToken: string;
  refreshToken: string;
}
