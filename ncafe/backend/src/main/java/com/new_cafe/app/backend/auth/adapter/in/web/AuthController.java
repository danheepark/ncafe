package com.new_cafe.app.backend.auth.adapter.in.web;

import com.new_cafe.app.backend.auth.application.port.in.GetCurrentAdminUseCase;
import com.new_cafe.app.backend.auth.application.port.in.LoginCommand;
import com.new_cafe.app.backend.auth.application.port.in.LoginUseCase;
import com.new_cafe.app.backend.auth.application.port.in.LogoutUseCase;
import com.new_cafe.app.backend.auth.domain.AuthSession;
import com.new_cafe.app.backend.auth.adapter.in.web.dto.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.Map;

/**
 * [Web Adapter] 인증 관련 HTTP 엔드포인트
 *
 * POST /api/auth/login   - 로그인
 * POST /api/auth/logout  - 로그아웃
 * GET  /api/auth/me      - 현재 로그인 정보 조회
 */
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/auth")
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

    /**
     * 로그인
     * POST /api/auth/login
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request,
                                   HttpServletResponse response) {
        try {
            String sessionId = loginUseCase.login(
                    LoginCommand.builder()
                            .username(request.getUsername())
                            .password(request.getPassword())
                            .build()
            );

            // 세션 ID를 HttpOnly 쿠키로 전달 (XSS 방어)
            Cookie cookie = new Cookie(SESSION_COOKIE_NAME, sessionId);
            cookie.setHttpOnly(true);
            cookie.setPath("/");
            cookie.setMaxAge(SESSION_MAX_AGE);
            // cookie.setSecure(true); // HTTPS 환경에서 활성화
            response.addCookie(cookie);

            AuthSession session = getCurrentAdminUseCase.getCurrentAdmin(sessionId);

            return ResponseEntity.ok(
                    LoginResponse.builder()
                            .sessionId(sessionId)
                            .username(session.getUsername())
                            .role(session.getRole())
                            .message("로그인 성공")
                            .build()
            );
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(401).body(Map.of("message", e.getMessage()));
        }
    }

    /**
     * 로그아웃
     * POST /api/auth/logout
     */
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        String sessionId = extractSessionId(request);
        if (sessionId != null) {
            logoutUseCase.logout(sessionId);
        }

        // 쿠키 만료
        Cookie cookie = new Cookie(SESSION_COOKIE_NAME, "");
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        return ResponseEntity.ok(Map.of("message", "로그아웃 되었습니다."));
    }

    /**
     * 현재 로그인 정보 조회
     * GET /api/auth/me
     */
    @GetMapping("/me")
    public ResponseEntity<?> me(HttpServletRequest request) {
        String sessionId = extractSessionId(request);
        if (sessionId == null) {
            return ResponseEntity.status(401).body(Map.of("message", "인증이 필요합니다."));
        }

        AuthSession session = getCurrentAdminUseCase.getCurrentAdmin(sessionId);
        if (session == null) {
            return ResponseEntity.status(401).body(Map.of("message", "세션이 만료되었습니다."));
        }

        return ResponseEntity.ok(
                LoginResponse.builder()
                        .username(session.getUsername())
                        .role(session.getRole())
                        .message("인증됨")
                        .build()
        );
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
