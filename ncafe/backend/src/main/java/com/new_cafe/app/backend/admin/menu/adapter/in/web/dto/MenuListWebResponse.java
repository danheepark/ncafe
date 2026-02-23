package com.new_cafe.app.backend.admin.menu.adapter.in.web.dto;

import com.new_cafe.app.backend.admin.menu.application.result.MenuListResult;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

/**
 * [Web DTO] 관리자용 메뉴 목록 응답
 */
@Getter
@Builder
public class MenuListWebResponse {
    private final List<MenuWebResponse> menus;
    private final int total;

    public static MenuListWebResponse from(MenuListResult result) {
        List<MenuWebResponse> menus = result.menus().stream()
                .map(MenuWebResponse::from)
                .collect(Collectors.toList());

        return MenuListWebResponse.builder()
                .menus(menus)
                .total(result.total())
                .build();
    }
}
