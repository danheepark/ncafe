package com.new_cafe.app.backend.admin.menu.adapter.in.web.dto;

import com.new_cafe.app.backend.admin.menu.application.command.CreateMenuCommand;

/**
 * [Web DTO] 메뉴 생성 요청
 */
public record MenuCreateWebRequest(
        String korName,
        String engName,
        String description,
        Integer price,
        Long categoryId,
        Boolean isAvailable
) {
    public CreateMenuCommand toCommand() {
        return new CreateMenuCommand(korName, engName, description, price, categoryId, isAvailable);
    }
}
