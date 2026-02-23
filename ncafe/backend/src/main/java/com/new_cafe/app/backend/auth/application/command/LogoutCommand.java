package com.new_cafe.app.backend.auth.application.command;

/**
 * [Command] 로그아웃 커맨드
 */
public record LogoutCommand(String sessionId) {
}
