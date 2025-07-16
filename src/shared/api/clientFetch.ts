// 요청 설정 옵션
interface RequestConfig {
  params?: Record<string, any>;     // URL 쿼리 파라미터
  headers?: Record<string, string>; // 추가 HTTP 헤더
  includeCredentials?: boolean;     // HTTP Only 쿠키 포함 여부 (기본값: true)
}

// 기본 API URL
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// 기본 HTTP 헤더
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

// URL과 쿼리 파라미터를 조합하여 완전한 URL 생성
function buildURL(endpoint: string, params?: Record<string, any>) {
  const url = new URL(endpoint, BASE_URL);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }
  
  return url.toString();
}

async function request<T>(
  method: string,        // HTTP 메서드 (GET, POST, PATCH, PUT, DELETE)
  endpoint: string,      // API 엔드포인트 경로 (예: '/users', '/goals')
  data?: any,           // 요청 본문 데이터 (POST, PATCH, PUT에서 사용)
  config?: RequestConfig // 추가 설정 (쿼리 파라미터, 헤더 등)
) {
  const url = buildURL(endpoint, config?.params);
  
  const response = await fetch(url, {
    method,
    credentials: config?.includeCredentials !== false ? 'include' : 'omit',
    headers: {
      ...DEFAULT_HEADERS,
      ...config?.headers,
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// 클라이언트 사이드 API 호출을 위한 fetch 래퍼
// HTTP Only 쿠키를 자동으로 포함하여 인증 처리
export const clientFetch = {
  // GET 요청
  get: <T>(endpoint: string, config?: RequestConfig) => 
    request<T>('GET', endpoint, undefined, config),
  
  // POST 요청 (데이터 생성)
  post: <T>(endpoint: string, data?: any, config?: RequestConfig) => 
    request<T>('POST', endpoint, data, config),
  
  // PATCH 요청 (부분 업데이트)
  patch: <T>(endpoint: string, data?: any, config?: RequestConfig) => 
    request<T>('PATCH', endpoint, data, config),
  
  // PUT 요청 (전체 업데이트)
  put: <T>(endpoint: string, data?: any, config?: RequestConfig) => 
    request<T>('PUT', endpoint, data, config),
  
  // DELETE 요청 (데이터 삭제)
  delete: <T>(endpoint: string, config?: RequestConfig) => 
    request<T>('DELETE', endpoint, undefined, config),
};
