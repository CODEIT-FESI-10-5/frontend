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
  name: string;
  email: string;
  profileImage: string;
}
