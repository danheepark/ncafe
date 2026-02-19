package com.new_cafe.app.backend.auth.application.port.in;

import lombok.Builder;
import lombok.Getter;

/**
 * 로그인 유스케이스 커맨드 객체
 * Controller → UseCase로 전달되는 입력값
 */
@Getter
@Builder
public class LoginCommand {

    private final String username;
    private final String password;
}
