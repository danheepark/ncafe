package com.new_cafe.app.backend.menu.application.port.in;

import com.new_cafe.app.backend.menu.domain.Menu;
import java.util.List;

/**
 * [Input Port] 메뉴 조회 유스케이스
 */
public interface GetMenuUseCase {
    List<Menu> getAllMenus();
    Menu getMenuById(Long id);
}
