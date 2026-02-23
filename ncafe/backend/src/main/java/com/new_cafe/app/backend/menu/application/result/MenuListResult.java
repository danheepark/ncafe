package com.new_cafe.app.backend.menu.application.result;

import com.new_cafe.app.backend.menu.domain.Menu;

import java.util.List;
import java.util.stream.Collectors;

/**
 * [Result] 메뉴 목록 조회 결과
 * UseCase → Controller로 반환되는 출력 객체
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
