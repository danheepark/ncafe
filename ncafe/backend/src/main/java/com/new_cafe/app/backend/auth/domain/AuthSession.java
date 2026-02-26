package com.new_cafe.app.backend.auth.domain;

import lombok.Builder;
import lombok.Getter;

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
