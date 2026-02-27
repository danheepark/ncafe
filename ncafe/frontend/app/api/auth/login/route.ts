import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/app/lib/session';

const API_BASE = process.env.API_BASE_URL || 'http://localhost:8022';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // 1. Spring Boot 로그인 API 호출 (서버 → 서버)
        // 백엔드는 /auth/login 엔드포인트를 가짐 (rewrite는 클라이언트 사이드에서만 동작함)
        const loginRes = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (!loginRes.ok) {
            const error = await loginRes.json().catch(() => ({ message: '로그인에 실패했습니다.' }));
            return NextResponse.json(error, { status: loginRes.status });
        }

        const data = await loginRes.json();
        const token = data.sessionId; // 백엔드에서는 sessionId라는 이름으로 반환됨

        if (!token) {
            return NextResponse.json({ message: '인증 토큰을 받지 못했습니다.' }, { status: 500 });
        }

        // 2. 세션에 저장 (httpOnly 쿠키로 암호화되어 저장됨)
        const session = await getSession();
        session.token = token;
        session.user = {
            username: data.username,
            role: data.role,
        };
        await session.save();

        // 3. 클라이언트에 user 정보만 반환 (세션 ID는 절대 반환하지 않음!)
        return NextResponse.json({ user: session.user });
    } catch (error) {
        console.error('Login Error:', error);
        return NextResponse.json({ message: '서버 오류가 발생했습니다.' }, { status: 500 });
    }
}
