package com.new_cafe.app.backend.auth.application.port.in;

import com.new_cafe.app.backend.auth.application.command.LogoutCommand;

/**
 * [Input Port] 로그아웃 유스케이스
 */
public interface LogoutUseCase {
    void logout(LogoutCommand command);
}
