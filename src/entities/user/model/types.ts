// 로그인 요청
export interface LoginRequest {
  email: string;
  password: string;
}

// 회원가입 요청
export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

// 프로필 응답
export interface ProfileResponse {
  id: string;
  name: string;
  email: string;
  image: string;
}
