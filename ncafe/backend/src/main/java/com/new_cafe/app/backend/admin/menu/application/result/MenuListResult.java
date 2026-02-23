package com.new_cafe.app.backend.admin.menu.application.result;

import com.new_cafe.app.backend.menu.domain.Menu;

import java.util.List;
import java.util.stream.Collectors;

/**
 * [Result] 관리자용 메뉴 목록 조회 결과
 */
public record MenuListResult(
        List<MenuResult> menus,
        int total
) {
    public static MenuListResult from(List<Menu> menus) {
        List<MenuResult> menuResults = menus.stream()
                .map(MenuResult::from)
                .collect(Collectors.toList());

        return new MenuListResult(menuResults, menuResults.size());
    }
}
