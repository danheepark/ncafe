package com.new_cafe.app.backend.auth.application.port.in;

import com.new_cafe.app.backend.auth.domain.AuthSession;

/**
 * [Input Port] 현재 로그인 정보 조회 유스케이스 인터페이스
 */
public interface GetCurrentAdminUseCase {

    /**
     * 세션 ID를 기반으로 현재 로그인된 관리자 정보를 반환
     *
     * @param sessionId 세션 식별자
     * @return AuthSession (없으면 null)
     */
    AuthSession getCurrentAdmin(String sessionId);
}
