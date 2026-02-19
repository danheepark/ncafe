package com.new_cafe.app.backend.auth.adapter.out.persistence;

import com.new_cafe.app.backend.auth.application.port.out.LoadAdminPort;
import com.new_cafe.app.backend.auth.domain.Admin;

import org.springframework.stereotype.Component;

import java.util.Optional;

/**
 * [Output Adapter] 관리자 조회 - 인메모리 구현체 (개발/초기 용도)
 *
 * TODO: DB 기반 구현체로 교체 시 이 클래스만 수정하거나,
 *       새로운 구현체를 만들고 @Primary 또는 @Qualifier로 교체하세요.
 *       LoadAdminPort 인터페이스는 그대로 유지됩니다.
 */
@Component
public class InMemoryAdminPersistenceAdapter implements LoadAdminPort {

    /**
     * TODO: 임시 하드코딩된 관리자 계정 - DB 조회로 교체하세요
     * 실제 구현 시 JdbcTemplate 또는 JPA를 사용하여 DB에서 조회
     */
    private static final Admin TEMP_ADMIN = Admin.builder()
            .id(1L)
            .username("admin")
            .password("admin1234") // TODO: 해시값으로 교체
            .role("ROLE_ADMIN")
            .build();

    @Override
    public Optional<Admin> findByUsername(String username) {
        // TODO: DB 조회로 교체
        // ex) jdbcTemplate.queryForObject("SELECT * FROM admins WHERE username = ?", ...)
        if (TEMP_ADMIN.getUsername().equals(username)) {
            return Optional.of(TEMP_ADMIN);
        }
        return Optional.empty();
    }

    @Override
    public Optional<Admin> findById(Long id) {
        // TODO: DB 조회로 교체
        if (TEMP_ADMIN.getId().equals(id)) {
            return Optional.of(TEMP_ADMIN);
        }
        return Optional.empty();
    }
}
