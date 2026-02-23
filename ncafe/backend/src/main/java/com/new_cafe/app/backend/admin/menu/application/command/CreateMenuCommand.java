package com.new_cafe.app.backend.admin.menu.application.command;

/**
 * [Command] 메뉴 생성 커맨드
 */
public record CreateMenuCommand(
        String korName,
        String engName,
        String description,
        Integer price,
        Long categoryId,
        Boolean isAvailable
) {
}
