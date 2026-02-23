package com.new_cafe.app.backend.admin.menu.application.command;

/**
 * [Command] 메뉴 수정 커맨드
 */
public record UpdateMenuCommand(
        Long id,
        String korName,
        String engName,
        String description,
        Integer price,
        Long categoryId,
        Boolean isAvailable
) {
}
