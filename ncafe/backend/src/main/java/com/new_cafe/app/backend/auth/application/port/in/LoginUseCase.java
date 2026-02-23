package com.new_cafe.app.backend.auth.application.port.in;

import com.new_cafe.app.backend.auth.application.command.LoginCommand;
import com.new_cafe.app.backend.auth.application.result.LoginResult;

/**
 * [Input Port] 로그인 유스케이스
 */
public interface LoginUseCase {
    LoginResult login(LoginCommand command);
}
