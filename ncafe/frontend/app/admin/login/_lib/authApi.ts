/**
 * 인증 관련 API 클라이언트
 * 백엔드 URL이나 엔드포인트가 바뀌면 이 파일만 수정하면 됩니다.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export interface LoginPayload {
    username: string;
    password: string;
}

export interface AuthUser {
    username: string;
    role: string;
    message: string;
}

export interface LoginResult {
    sessionId: string;
    username: string;
    role: string;
    message: string;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${path}`, {
        credentials: 'include', // HttpOnly 쿠키 자동 포함
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({ message: '서버 오류가 발생했습니다.' }));
        throw new Error(error.message || '요청에 실패했습니다.');
    }

    return res.json();
}

export const authApi = {
    /**
     * 로그인 - POST /api/auth/login
     */
    login: (payload: LoginPayload): Promise<LoginResult> =>
        request('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(payload),
        }),

    /**
     * 로그아웃 - POST /api/auth/logout
     */
    logout: (): Promise<{ message: string }> =>
        request('/api/auth/logout', { method: 'POST' }),

    /**
     * 현재 로그인 정보 조회 - GET /api/auth/me
     */
    me: (): Promise<AuthUser> => request('/api/auth/me'),
};
