package com.new_cafe.app.backend.admin.menu.application.port.in;

import com.new_cafe.app.backend.admin.menu.application.command.*;
import com.new_cafe.app.backend.admin.menu.application.result.MenuResult;
import com.new_cafe.app.backend.admin.menu.application.result.MenuListResult;

/**
 * [Input Port] 관리자용 메뉴 관리 유스케이스
 * CRUD 전체를 포함합니다.
 */
public interface ManageMenuUseCase {

    /**
     * 단일 메뉴 조회
     */
    MenuResult getMenu(GetMenuCommand command);

    /**
     * 전체 메뉴 목록 조회
     */
    MenuListResult getMenus(GetMenusCommand command);

    /**
     * 메뉴 생성
     */
    MenuResult createMenu(CreateMenuCommand command);

    /**
     * 메뉴 수정
     */
    MenuResult updateMenu(UpdateMenuCommand command);

    /**
     * 메뉴 삭제
     */
    void deleteMenu(DeleteMenuCommand command);
}
