package com.new_cafe.app.backend.admin.menu.adapter.in.web.dto;

import com.new_cafe.app.backend.admin.menu.application.command.UpdateMenuCommand;

/**
 * [Web DTO] 메뉴 수정 요청
 */
public record MenuUpdateWebRequest(
        String korName,
        String engName,
        String description,
        Integer price,
        Long categoryId,
        Boolean isAvailable
) {
    public UpdateMenuCommand toCommand(Long id) {
        return new UpdateMenuCommand(id, korName, engName, description, price, categoryId, isAvailable);
    }
}
