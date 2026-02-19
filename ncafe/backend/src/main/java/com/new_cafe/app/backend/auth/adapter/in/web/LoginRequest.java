package com.new_cafe.app.backend.auth.adapter.in.web;

import lombok.Builder;
import lombok.Getter;

/**
 * 로그인 HTTP 요청 DTO
 */
@Getter
@Builder
public class LoginRequest {

    private String username;
    private String password;
}
