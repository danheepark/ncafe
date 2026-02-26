package com.new_cafe.app.backend.auth.application.port.out;

import com.new_cafe.app.backend.auth.domain.AuthSession;
import java.util.Optional;

public interface SessionStorePort {
    void save(AuthSession session);
    Optional<AuthSession> findBySessionId(String sessionId);
    void delete(String sessionId);
}
