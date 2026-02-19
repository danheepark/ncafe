package com.new_cafe.app.backend.auth.application.service;

import com.new_cafe.app.backend.auth.application.port.in.LoginCommand;
import com.new_cafe.app.backend.auth.application.port.in.LoginUseCase;
import com.new_cafe.app.backend.auth.application.port.in.LogoutUseCase;
import com.new_cafe.app.backend.auth.application.port.in.GetCurrentAdminUseCase;
import com.new_cafe.app.backend.auth.application.port.out.LoadAdminPort;
import com.new_cafe.app.backend.auth.application.port.out.SessionStorePort;
import com.new_cafe.app.backend.auth.domain.Admin;
import com.new_cafe.app.backend.auth.domain.AuthSession;

import org.springframework.stereotype.Service;

import java.util.UUID;

/**
 * [Application Service] 로그인/로그아웃 유스케이스 구현체
 *
 * ※ 인증(비밀번호 검증) 로직은 authenticateAdmin()에 TODO로 표시
 *   직접 구현 시 해당 메서드만 수정하면 됩니다.
 */
@Service
public class AuthService implements LoginUseCase, LogoutUseCase, GetCurrentAdminUseCase {

    private final LoadAdminPort loadAdminPort;
    private final SessionStorePort sessionStorePort;

    public AuthService(LoadAdminPort loadAdminPort, SessionStorePort sessionStorePort) {
        this.loadAdminPort = loadAdminPort;
        this.sessionStorePort = sessionStorePort;
    }

    @Override
    public String login(LoginCommand command) {
        // 1. 관리자 조회
        Admin admin = loadAdminPort.findByUsername(command.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("아이디 또는 비밀번호가 올바르지 않습니다."));

        // 2. 비밀번호 검증 (TODO: 실제 인증 로직을 여기에 구현하세요)
        authenticateAdmin(admin, command.getPassword());

        // 3. 세션 생성 및 저장
        String sessionId = UUID.randomUUID().toString();
        AuthSession session = AuthSession.of(sessionId, admin);
        sessionStorePort.save(session);

        return sessionId;
    }

    @Override
    public void logout(String sessionId) {
        sessionStorePort.delete(sessionId);
    }

    @Override
    public AuthSession getCurrentAdmin(String sessionId) {
        return sessionStorePort.findBySessionId(sessionId).orElse(null);
    }

    /**
     * TODO: 실제 비밀번호 인증 로직을 구현하세요
     * 예: BCrypt, PBKDF2 등의 해시 비교
     *
     * @param admin           DB에서 조회된 관리자
     * @param rawPassword     사용자가 입력한 평문 비밀번호
     */
    private void authenticateAdmin(Admin admin, String rawPassword) {
        // TODO: 아래 간단한 평문 비교를 실제 해시 검증으로 교체하세요
        if (!admin.getPassword().equals(rawPassword)) {
            throw new IllegalArgumentException("아이디 또는 비밀번호가 올바르지 않습니다.");
        }
    }
}
