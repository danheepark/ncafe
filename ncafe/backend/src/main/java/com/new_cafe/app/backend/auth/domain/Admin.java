package com.new_cafe.app.backend.auth.domain;

import lombok.Builder;
import lombok.Getter;

/**
 * 관리자 도메인 모델
 * 외부 기술(DB, HTTP 등)에 의존하지 않는 순수한 도메인 객체
 */
@Getter
@Builder
public class Admin {

    private final Long id;
    private final String username;
    private final String password; // 실제 인증 로직 구현 시 해시값 저장
    private final String role;

    public boolean isValid() {
        return id != null && username != null && !username.isBlank();
    }
}
