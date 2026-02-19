package com.new_cafe.app.backend.auth.adapter.in.web.dto;

import lombok.Builder;
import lombok.Getter;

/**
 * 로그인 HTTP 응답 DTO
 */
@Getter
@Builder
public class LoginResponse {

    private String sessionId;
    private String username;
    private String role;
    private String message;
}
