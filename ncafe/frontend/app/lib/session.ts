import { getIronSession, SessionOptions } from 'iron-session';
import { cookies } from 'next/headers';

// 세션에 저장할 사용자 정보 타입
export interface SessionUser {
    username: string;
    role: string;
}

export interface SessionData {
    token: string;      // Spring Boot에서 발급받은 sessionId (여기서는 token으로 명칭)
    user: SessionUser;  // 사용자 정보
}

export const sessionOptions: SessionOptions = {
    password: process.env.SESSION_SECRET || 'default-secret-change-in-production-32-chars-min',
    cookieName: 'app_session',
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' as const,
        path: '/',
        maxAge: 60 * 60 * 8,                             // 8시간 (백엔드와 맞춤)
    },
};

export async function getSession() {
    const cookieStore = await cookies();
    return getIronSession<SessionData>(cookieStore, sessionOptions);
}
