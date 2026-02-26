package com.new_cafe.app.backend.auth.adapter.in.web;

import com.new_cafe.app.backend.auth.application.command.GetCurrentAdminCommand;
import com.new_cafe.app.backend.auth.application.command.LoginCommand;
import com.new_cafe.app.backend.auth.application.command.LogoutCommand;
import com.new_cafe.app.backend.auth.application.port.in.GetCurrentAdminUseCase;
import com.new_cafe.app.backend.auth.application.port.in.LoginUseCase;
import com.new_cafe.app.backend.auth.application.port.in.LogoutUseCase;
import com.new_cafe.app.backend.auth.application.result.AuthSessionResult;
import com.new_cafe.app.backend.auth.application.result.LoginResult;
import com.new_cafe.app.backend.auth.adapter.in.web.dto.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.Map;

/**
 * [Web Adapter] 인증 컨트롤러 리팩토링
 */
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/auth")
public class AuthController {

    private static final String SESSION_COOKIE_NAME = "ADMIN_SESSION";
    private static final int SESSION_MAX_AGE = 60 * 60 * 8; // 8시간

    private final LoginUseCase loginUseCase;
    private final LogoutUseCase logoutUseCase;
    private final GetCurrentAdminUseCase getCurrentAdminUseCase;

    public AuthController(LoginUseCase loginUseCase,
                          LogoutUseCase logoutUseCase,
                          GetCurrentAdminUseCase getCurrentAdminUseCase) {
        this.loginUseCase = loginUseCase;
        this.logoutUseCase = logoutUseCase;
        this.getCurrentAdminUseCase = getCurrentAdminUseCase;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request,
                                   HttpServletResponse response) {
        try {
            LoginResult result = loginUseCase.login(
                    LoginCommand.builder()
                            .username(request.getUsername())
                            .password(request.getPassword())
                            .build()
            );

            Cookie cookie = new Cookie(SESSION_COOKIE_NAME, result.sessionId());
            cookie.setHttpOnly(true);
            cookie.setPath("/");
            cookie.setMaxAge(SESSION_MAX_AGE);
            response.addCookie(cookie);

            return ResponseEntity.ok(LoginResponse.from(result));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(401).body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        String sessionId = extractSessionId(request);
        if (sessionId != null) {
            logoutUseCase.logout(new LogoutCommand(sessionId));
        }

        Cookie cookie = new Cookie(SESSION_COOKIE_NAME, "");
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        return ResponseEntity.ok(Map.of("message", "로그아웃 되었습니다."));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(HttpServletRequest request) {
        String sessionId = extractSessionId(request);
        if (sessionId == null) {
            return ResponseEntity.status(401).body(Map.of("message", "인증이 필요합니다."));
        }

        AuthSessionResult result = getCurrentAdminUseCase.getCurrentAdmin(new GetCurrentAdminCommand(sessionId));
        if (result == null) {
            return ResponseEntity.status(401).body(Map.of("message", "세션이 만료되었습니다."));
        }

        return ResponseEntity.ok(LoginResponse.from(result));
    }

    private String extractSessionId(HttpServletRequest request) {
        if (request.getCookies() == null) return null;
        return Arrays.stream(request.getCookies())
                .filter(c -> SESSION_COOKIE_NAME.equals(c.getName()))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(null);
    }
}
