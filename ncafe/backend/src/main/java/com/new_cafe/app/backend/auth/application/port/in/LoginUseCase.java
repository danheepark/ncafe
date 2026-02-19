package com.new_cafe.app.backend.auth.application.port.in;

/**
 * [Input Port] 로그인 유스케이스 인터페이스
 * 외부(Controller)가 애플리케이션을 호출하는 진입점
 */
public interface LoginUseCase {

    /**
     * @param command 로그인 커맨드 (username, password)
     * @return 세션 ID (토큰 등)
     */
    String login(LoginCommand command);
}
