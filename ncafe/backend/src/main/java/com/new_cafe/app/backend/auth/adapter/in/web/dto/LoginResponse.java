package com.new_cafe.app.backend.auth.adapter.in.web.dto;

import com.new_cafe.app.backend.auth.application.result.AuthSessionResult;
import com.new_cafe.app.backend.auth.application.result.LoginResult;
import lombok.Builder;
import lombok.Getter;

/**
 * 로그인 HTTP 응답 DTO 리팩토링
 */
@Getter
@Builder
public class LoginResponse {

    private String sessionId;
    private String username;
    private String role;
    private String message;

    public static LoginResponse from(LoginResult result) {
        return LoginResponse.builder()
                .sessionId(result.sessionId())
                .username(result.username())
                .role(result.role())
                .message("성공")
                .build();
    }

    public static LoginResponse from(AuthSessionResult result) {
        return LoginResponse.builder()
                .username(result.username())
                .role(result.role())
                .message("인증됨")
                .build();
    }
}
