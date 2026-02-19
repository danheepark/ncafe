package com.new_cafe.app.backend.auth.application.port.in;

/**
 * [Input Port] 로그아웃 유스케이스 인터페이스
 */
public interface LogoutUseCase {

    void logout(String sessionId);
}
