package com.new_cafe.app.backend.auth.domain;

import lombok.Builder;
import lombok.Getter;

/**
 * 로그인 후 생성되는 세션 정보 도메인 모델
 */
@Getter
@Builder
public class AuthSession {

    private final String sessionId;
    private final Long adminId;
    private final String username;
    private final String role;

    public static AuthSession of(String sessionId, Admin admin) {
        return AuthSession.builder()
                .sessionId(sessionId)
                .adminId(admin.getId())
                .username(admin.getUsername())
                .role(admin.getRole())
                .build();
    }
}
