package com.new_cafe.app.backend.admin.menu.application.service;

import com.new_cafe.app.backend.admin.menu.application.command.*;
import com.new_cafe.app.backend.admin.menu.application.port.in.ManageMenuUseCase;
import com.new_cafe.app.backend.admin.menu.application.port.out.MenuPort;
import com.new_cafe.app.backend.admin.menu.application.result.MenuListResult;
import com.new_cafe.app.backend.admin.menu.application.result.MenuResult;
import com.new_cafe.app.backend.menu.domain.Menu;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * [Application Service] 관리자용 메뉴 관리 비즈니스 로직
 */
@Service("adminMenuService")
@RequiredArgsConstructor
@Transactional
class MenuService implements ManageMenuUseCase {

    private final MenuPort menuPort;

    @Override
    @Transactional(readOnly = true)
    public MenuResult getMenu(GetMenuCommand command) {
        Menu menu = menuPort.findById(command.id())
                .orElseThrow(() -> new IllegalArgumentException("메뉴를 찾을 수 없습니다. ID: " + command.id()));
        
        java.util.List<com.new_cafe.app.backend.menu.domain.MenuImage> images = menuPort.findImagesByMenuId(menu.getId());
        Menu menuWithImages = buildMenuWithImages(menu, images);
        
        return MenuResult.from(menuWithImages);
    }

    @Override
    @Transactional(readOnly = true)
    public MenuListResult getMenus(GetMenusCommand command) {
        java.util.List<Menu> menus = menuPort.findAll();
        java.util.List<Menu> menusWithImages = menus.stream()
                .map(menu -> {
                    java.util.List<com.new_cafe.app.backend.menu.domain.MenuImage> images = menuPort.findImagesByMenuId(menu.getId());
                    return buildMenuWithImages(menu, images);
                })
                .collect(java.util.stream.Collectors.toList());
        
        return MenuListResult.from(menusWithImages);
    }

    private Menu buildMenuWithImages(Menu menu, java.util.List<com.new_cafe.app.backend.menu.domain.MenuImage> images) {
        return Menu.builder()
                .id(menu.getId())
                .korName(menu.getKorName())
                .engName(menu.getEngName())
                .description(menu.getDescription())
                .price(menu.getPrice())
                .categoryId(menu.getCategoryId())
                .categoryName(menu.getCategoryName())
                .isAvailable(menu.getIsAvailable())
                .images(images)
                .createdAt(menu.getCreatedAt())
                .updatedAt(menu.getUpdatedAt())
                .build();
    }

    @Override
    public MenuResult createMenu(CreateMenuCommand command) {
        Menu menu = Menu.builder()
                .korName(command.korName())
                .engName(command.engName())
                .description(command.description())
                .price(command.price())
                .categoryId(command.categoryId())
                .isAvailable(command.isAvailable())
                .build();

        Menu saved = menuPort.save(menu);
        return MenuResult.from(saved);
    }

    @Override
    public MenuResult updateMenu(UpdateMenuCommand command) {
        // 기존 메뉴 존재 확인
        menuPort.findById(command.id())
                .orElseThrow(() -> new IllegalArgumentException("수정할 메뉴를 찾을 수 없습니다. ID: " + command.id()));

        Menu menu = Menu.builder()
                .id(command.id())
                .korName(command.korName())
                .engName(command.engName())
                .description(command.description())
                .price(command.price())
                .categoryId(command.categoryId())
                .isAvailable(command.isAvailable())
                .build();

        Menu updated = menuPort.save(menu);
        return MenuResult.from(updated);
    }

    @Override
    public void deleteMenu(DeleteMenuCommand command) {
        menuPort.findById(command.id())
                .orElseThrow(() -> new IllegalArgumentException("삭제할 메뉴를 찾을 수 없습니다. ID: " + command.id()));
        menuPort.deleteById(command.id());
    }
}
