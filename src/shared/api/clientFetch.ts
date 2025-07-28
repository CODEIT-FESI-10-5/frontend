  /* eslint-disable @typescript-eslint/no-explicit-any */
  /* eslint-disable @typescript-eslint/no-unused-vars */

  // 요청 설정 옵션
  interface RequestConfig {
    params?: Record<string, any>; // URL 쿼리 파라미터
    headers?: Record<string, string | undefined>; // 추가 HTTP 헤더 (delete 연산자 지원)
    includeCredentials?: boolean; // HTTP Only 쿠키 포함 여부 (기본값: true)
  }

  // 기본 API URL
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

  // 기본 HTTP 헤더
  const DEFAULT_HEADERS: { 'Content-Type'?: string } = {
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
    method: string, // HTTP 메서드 (GET, POST, PATCH, PUT, DELETE)
    endpoint: string, // API 엔드포인트 경로 (예: '/users', '/goals')
    data?: any, // 요청 본문 데이터 (POST, PATCH, PUT에서 사용)
    config?: RequestConfig, // 추가 설정 (쿼리 파라미터, 헤더 등)
  ) {
    const url = buildURL(endpoint, config?.params);

    // FormData일 경우 Content-Type 헤더 제거 및 body 그대로 전달
    const isFormData =
      typeof FormData !== 'undefined' && data instanceof FormData;
    const headers = {
      ...DEFAULT_HEADERS,
      ...config?.headers,
    };
    if (isFormData && 'Content-Type' in headers) {
      // Content-Type 헤더가 있으면 제거 (브라우저가 자동으로 설정)
      delete headers['Content-Type'];
    }

    const response = await fetch(url, {
      method,
      credentials: config?.includeCredentials !== false ? 'include' : 'omit',
      headers,
      body: data ? (isFormData ? data : JSON.stringify(data)) : undefined,
    });

    // HTTP 상태 코드 검사
    if (!response.ok) {
      let errorBody: any = null;

      // JSON 파싱을 시도하되 실패하면 null 반환
      try {
        errorBody = await response.json();
      } catch {
        errorBody = await response.text(); // fallback
      }

      const error = new Error(`HTTP error! status: ${response.status}`);
      (error as any).status = response.status;
      (error as any).body = errorBody;
      throw error;
    }

    // 응답 본문이 비어 있을 수 있으므로 안전하게 JSON 파싱
    try {
      // 응답 크기가 0이면 undefined 반환
      const text = await response.text();
      return text ? JSON.parse(text) : undefined;
    } catch (parseError) {
      throw new Error(`Failed to parse JSON: ${parseError}`);
    }
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
