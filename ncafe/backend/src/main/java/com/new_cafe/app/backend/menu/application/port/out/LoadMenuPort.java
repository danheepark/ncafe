package com.new_cafe.app.backend.menu.application.port.out;

import com.new_cafe.app.backend.menu.domain.Menu;
import com.new_cafe.app.backend.menu.domain.MenuImage;
import java.util.List;
import java.util.Optional;

/**
 * [Output Port] 메뉴 데이터 로드 포트
 */
public interface LoadMenuPort {
    List<Menu> findAll();
    Optional<Menu> findById(Long id);
    List<Menu> findByCategoryId(Long categoryId);
    List<MenuImage> findImagesByMenuId(Long menuId);
}
