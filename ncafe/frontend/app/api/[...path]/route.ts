import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/app/lib/session';

const API_BASE = process.env.API_BASE_URL || 'http://localhost:8022';

async function proxyRequest(req: NextRequest) {
    const session = await getSession();
    const { pathname, search } = req.nextUrl;

    // /api/menus -> /menus
    const path = pathname.replace(/^\/api/, '');
    const targetUrl = `${API_BASE}${path}${search}`;

    // 요청 헤더 구성
    const headers: Record<string, string> = {};

    // 기존 헤더 복사 (Host 등 일부 제외)
    req.headers.forEach((value, key) => {
        if (!['host', 'connection', 'cookie'].includes(key.toLowerCase())) {
            headers[key] = value;
        }
    });

    // ★ 핵심: 세션에 토큰이 있으면 Cookie 헤더 주입 
    // (이 프로젝트의 백엔드는 쿠키 기반이므로 Authorization 대신 Cookie를 사용합니다)
    if (session.token) {
        headers['Cookie'] = `ADMIN_SESSION=${session.token}`;
    }

    // 요청 본문 전달
    let body: BodyInit | null = null;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
        const contentType = req.headers.get('content-type');
        if (contentType?.includes('multipart/form-data')) {
            body = await req.blob();
        } else {
            body = await req.text();
        }
    }

    try {
        const proxyRes = await fetch(targetUrl, {
            method: req.method,
            headers,
            body,
            cache: 'no-store',
        });

        // 401 응답 시 세션 삭제 (토큰 만료)
        if (proxyRes.status === 401 && session.token) {
            session.destroy();
        }

        // 응답 헤더 구성
        const responseHeaders = new Headers();
        proxyRes.headers.forEach((value, key) => {
            if (!['set-cookie', 'connection', 'transfer-encoding'].includes(key.toLowerCase())) {
                responseHeaders.set(key, value);
            }
        });

        return new NextResponse(proxyRes.body, {
            status: proxyRes.status,
            statusText: proxyRes.statusText,
            headers: responseHeaders,
        });
    } catch (error) {
        console.error('Proxy Error:', error);
        return NextResponse.json({ message: '백엔드 서버에 연결할 수 없습니다.' }, { status: 502 });
    }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const DELETE = proxyRequest;
export const PATCH = proxyRequest;
