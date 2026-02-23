package com.new_cafe.app.backend.menu.application.command;

/**
 * [Command] 메뉴 목록 조회 커맨드
 * @param categoryId 특정 카테고리의 메뉴만 조회하고 싶을 때 사용
 * @param searchQuery 메뉴 이름 등으로 검색하고 싶을 때 사용
 */
public record GetMenusCommand(
        Long categoryId,
        String searchQuery
) {
    public static GetMenusCommand empty() {
        return new GetMenusCommand(null, null);
    }
}
