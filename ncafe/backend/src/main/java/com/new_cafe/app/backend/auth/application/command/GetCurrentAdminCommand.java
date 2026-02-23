package com.new_cafe.app.backend.auth.application.command;

/**
 * [Command] 현재 관리자 조회 커맨드
 */
public record GetCurrentAdminCommand(String sessionId) {
}
