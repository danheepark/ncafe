package com.new_cafe.app.backend.auth.application.result;

import com.new_cafe.app.backend.auth.domain.AuthSession;

/**
 * [Result] 로그인 결과
 */
public record LoginResult(
        String sessionId,
        String username,
        String role
) {
    public static LoginResult from(AuthSession session) {
        return new LoginResult(
                session.getSessionId(),
                session.getUsername(),
                session.getRole()
        );
    }
}
