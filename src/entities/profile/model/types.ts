export interface ChangePasswordRequestApi {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

// 닉네임 변경
export interface ChangeNicknameRequestApi {
  nickname: string;
}

export interface ChangeNicknameResponseApi {
  httpStatusCode: number;
  errorCode: string;
  data: {
    nickname: string;
  };
  errorMessage: string;
  fieldErors: {
    field: string;
    message: string;
  }[];
}

// 프로필 이미지 변경
export interface ChangeProfileRequestApi {
  profileImageAction: 'UPLOAD' | 'RESET' | 'NONE';
  newImageFile?: File;
}

export interface ChangeProfileResponseApi {
  httpStatusCode: number;
  errorCode: string;
  data: {
    profileImg: string;
  };
  errorMessage: string;
  fieldErors: {
    field: string;
    message: string;
  }[];
}
