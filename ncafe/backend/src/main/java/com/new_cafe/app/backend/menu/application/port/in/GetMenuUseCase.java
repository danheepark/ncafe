package com.new_cafe.app.backend.menu.application.port.in;

import com.new_cafe.app.backend.menu.application.command.GetMenuCommand;
import com.new_cafe.app.backend.menu.application.command.GetMenusCommand;
import com.new_cafe.app.backend.menu.application.result.MenuResult;
import com.new_cafe.app.backend.menu.application.result.MenuListResult;

/**
 * [Input Port] 메뉴 조회 유스케이스
 */
public interface GetMenuUseCase {

    /**
     * 단일 메뉴 조회
     */
    MenuResult getMenu(GetMenuCommand command);

    /**
     * 전체 메뉴 목록 조회
     */
    MenuListResult getMenus(GetMenusCommand command);
}
