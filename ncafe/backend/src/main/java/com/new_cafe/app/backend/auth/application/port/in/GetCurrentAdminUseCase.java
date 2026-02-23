package com.new_cafe.app.backend.auth.application.port.in;

import com.new_cafe.app.backend.auth.application.command.GetCurrentAdminCommand;
import com.new_cafe.app.backend.auth.application.result.AuthSessionResult;

/**
 * [Input Port] 현재 로그인 정보 조회 유스케이스
 */
public interface GetCurrentAdminUseCase {
    AuthSessionResult getCurrentAdmin(GetCurrentAdminCommand command);
}
