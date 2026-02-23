package com.new_cafe.app.backend.auth.application.command;

import lombok.Builder;
import lombok.Getter;

/**
 * [Command] 로그인 커맨드
 */
@Getter
@Builder
public class LoginCommand {
    private final String username;
    private final String password;
}
