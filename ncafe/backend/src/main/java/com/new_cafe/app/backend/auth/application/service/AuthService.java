package com.new_cafe.app.backend.auth.application.service;

import com.new_cafe.app.backend.auth.application.command.GetCurrentAdminCommand;
import com.new_cafe.app.backend.auth.application.command.LoginCommand;
import com.new_cafe.app.backend.auth.application.command.LogoutCommand;
import com.new_cafe.app.backend.auth.application.port.in.GetCurrentAdminUseCase;
import com.new_cafe.app.backend.auth.application.port.in.LoginUseCase;
import com.new_cafe.app.backend.auth.application.port.in.LogoutUseCase;
import com.new_cafe.app.backend.auth.application.port.out.LoadAdminPort;
import com.new_cafe.app.backend.auth.application.port.out.SessionStorePort;
import com.new_cafe.app.backend.auth.application.result.AuthSessionResult;
import com.new_cafe.app.backend.auth.application.result.LoginResult;
import com.new_cafe.app.backend.auth.domain.Admin;
import com.new_cafe.app.backend.auth.domain.AuthSession;
import org.springframework.stereotype.Service;

import java.util.UUID;

/**
 * [Application Service] 인증 서비스 리팩토링
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
    public LoginResult login(LoginCommand command) {
        Admin admin = loadAdminPort.findByUsername(command.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("아이디 또는 비밀번호가 올바르지 않습니다."));

        authenticateAdmin(admin, command.getPassword());

        String sessionId = UUID.randomUUID().toString();
        AuthSession session = AuthSession.of(sessionId, admin);
        sessionStorePort.save(session);

        return LoginResult.from(session);
    }

    @Override
    public void logout(LogoutCommand command) {
        sessionStorePort.delete(command.sessionId());
    }

    @Override
    public AuthSessionResult getCurrentAdmin(GetCurrentAdminCommand command) {
        return sessionStorePort.findBySessionId(command.sessionId())
                .map(AuthSessionResult::from)
                .orElse(null);
    }

    private void authenticateAdmin(Admin admin, String rawPassword) {
        if (!admin.getPassword().equals(rawPassword)) {
            throw new IllegalArgumentException("아이디 또는 비밀번호가 올바르지 않습니다.");
        }
    }
}
