package com.new_cafe.app.backend.auth.adapter.out.session;

import com.new_cafe.app.backend.auth.application.port.out.SessionStorePort;
import com.new_cafe.app.backend.auth.domain.AuthSession;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class InMemorySessionStoreAdapter implements SessionStorePort {

    private final Map<String, AuthSession> store = new ConcurrentHashMap<>();

    @Override
    public void save(AuthSession session) {
        store.put(session.getSessionId(), session);
    }

    @Override
    public Optional<AuthSession> findBySessionId(String sessionId) {
        return Optional.ofNullable(store.get(sessionId));
    }

    @Override
    public void delete(String sessionId) {
        store.remove(sessionId);
    }
}
