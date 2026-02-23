package com.new_cafe.app.backend.menu.application.service;

import com.new_cafe.app.backend.menu.application.command.GetMenuCommand;
import com.new_cafe.app.backend.menu.application.command.GetMenusCommand;
import com.new_cafe.app.backend.menu.application.port.in.GetMenuUseCase;
import com.new_cafe.app.backend.menu.application.port.out.LoadMenuPort;
import com.new_cafe.app.backend.menu.application.result.MenuListResult;
import com.new_cafe.app.backend.menu.application.result.MenuResult;
import com.new_cafe.app.backend.menu.domain.Menu;
import com.new_cafe.app.backend.menu.domain.MenuImage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * [Application Service] 메뉴 조회 비즈니스 로직
 */
@Service("customerMenuQueryService")
@RequiredArgsConstructor
@Transactional(readOnly = true)
class MenuQueryService implements GetMenuUseCase {

    private final LoadMenuPort loadMenuPort;

    @Override
    public MenuResult getMenu(GetMenuCommand command) {
        Menu menu = loadMenuPort.findById(command.id())
                .orElseThrow(() -> new IllegalArgumentException("메뉴를 찾을 수 없습니다. ID: " + command.id()));
        
        List<MenuImage> images = loadMenuPort.findImagesByMenuId(menu.getId());
        
        Menu menuWithImages = buildMenuWithImages(menu, images);
        return MenuResult.from(menuWithImages);
    }

    @Override
    public MenuListResult getMenus(GetMenusCommand command) {
        // 🆕 필터 조건에 따른 조회 실행
        List<Menu> menus = loadMenuPort.findByCondition(command.categoryId(), command.searchQuery());
        
        List<Menu> menusWithImages = menus.stream()
                .map(menu -> {
                    List<MenuImage> images = loadMenuPort.findImagesByMenuId(menu.getId());
                    return buildMenuWithImages(menu, images);
                })
                .collect(Collectors.toList());

        return MenuListResult.from(menusWithImages);
    }

    private Menu buildMenuWithImages(Menu menu, List<MenuImage> images) {
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
}
