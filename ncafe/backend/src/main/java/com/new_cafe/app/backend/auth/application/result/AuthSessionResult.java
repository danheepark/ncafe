package com.new_cafe.app.backend.auth.application.result;

import com.new_cafe.app.backend.auth.domain.AuthSession;

/**
 * [Result] 세션 조회 결과
 */
public record AuthSessionResult(
        String sessionId,
        String username,
        String role
) {
    public static AuthSessionResult from(AuthSession session) {
        if (session == null) return null;
        return new AuthSessionResult(
                session.getSessionId(),
                session.getUsername(),
                session.getRole()
        );
    }
}
