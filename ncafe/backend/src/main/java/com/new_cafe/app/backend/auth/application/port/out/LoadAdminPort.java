package com.new_cafe.app.backend.auth.application.port.out;

import com.new_cafe.app.backend.auth.domain.Admin;
import java.util.Optional;

/**
 * [Output Port] 관리자 정보를 외부 저장소(DB 등)에서 불러오는 포트
 * 애플리케이션이 인프라에 요청하는 인터페이스 - 실제 DB 구현체는 adapter/out에 위치
 */
public interface LoadAdminPort {

    /**
     * username으로 관리자 조회
     */
    Optional<Admin> findByUsername(String username);

    /**
     * id로 관리자 조회
     */
    Optional<Admin> findById(Long id);
}
