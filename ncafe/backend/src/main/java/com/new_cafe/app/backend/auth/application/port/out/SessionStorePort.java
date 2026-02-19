package com.new_cafe.app.backend.auth.application.port.out;

import com.new_cafe.app.backend.auth.domain.AuthSession;
import java.util.Optional;

/**
 * [Output Port] 세션 저장소 포트
 * 현재는 메모리 구현이지만, Redis/DB 등으로 교체 시 구현체만 바꾸면 됨
 */
public interface SessionStorePort {

    void save(AuthSession session);

    Optional<AuthSession> findBySessionId(String sessionId);

    void delete(String sessionId);
}
