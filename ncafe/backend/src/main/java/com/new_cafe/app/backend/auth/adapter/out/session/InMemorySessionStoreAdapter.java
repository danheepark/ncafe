package com.new_cafe.app.backend.auth.adapter.out.session;

import com.new_cafe.app.backend.auth.application.port.out.SessionStorePort;
import com.new_cafe.app.backend.auth.domain.AuthSession;

import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

/**
 * [Output Adapter] 세션 저장소 - 인메모리 구현체
 *
 * TODO: Redis나 DB 기반 세션으로 교체 시 이 클래스만 수정하거나,
 *       새로운 구현체를 만들고 @Primary로 교체하세요.
 *       SessionStorePort 인터페이스는 그대로 유지됩니다.
 *
 * 주의: 서버 재시작 시 세션이 초기화됩니다.
 */
@Component
public class InMemorySessionStoreAdapter implements SessionStorePort {

    // TODO: Redis로 교체 시 RedisTemplate 사용
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
