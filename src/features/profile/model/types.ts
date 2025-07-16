// 프로필 조회 응답
export interface ProfileResponse {
  name: string;
  email: string;
  profile: string;
}

// 프로필 수정 요청
export interface UpdateProfileRequest {
  name?: string;
  profile?: string;
}

// 프로필 수정 응답
export interface UpdateProfileResponse {
  name: string;
  email: string;
  profile: string;
}
