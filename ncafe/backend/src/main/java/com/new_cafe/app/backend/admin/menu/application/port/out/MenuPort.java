package com.new_cafe.app.backend.admin.menu.application.port.out;

import com.new_cafe.app.backend.menu.domain.Menu;

import java.util.List;
import java.util.Optional;

/**
 * [Output Port] 관리자용 메뉴 데이터 포트
 * 조회뿐만 아니라 저장/수정/삭제도 포함합니다.
 */
public interface MenuPort {

    List<Menu> findAll();

    Optional<Menu> findById(Long id);
    
    java.util.List<com.new_cafe.app.backend.menu.domain.MenuImage> findImagesByMenuId(Long menuId);

    Menu save(Menu menu);

    void deleteById(Long id);
}
