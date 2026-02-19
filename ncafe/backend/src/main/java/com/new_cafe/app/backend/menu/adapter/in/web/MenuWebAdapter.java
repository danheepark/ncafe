package com.new_cafe.app.backend.menu.adapter.in.web;

import com.new_cafe.app.backend.menu.application.port.in.GetMenuUseCase;
import com.new_cafe.app.backend.menu.domain.Menu;
import com.new_cafe.app.backend.menu.adapter.in.web.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * [Web Adapter] 메뉴 관련 API 컨트롤러
 */
@RestController
@RequestMapping("/api/admin/menus")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // 실제 운영 환경에서는 구체적인 도메인 설정 필요
public class MenuWebAdapter {

    private final GetMenuUseCase getMenuUseCase;

    @GetMapping
    public List<MenuWebResponse> getAllMenus() {
        return getMenuUseCase.getAllMenus().stream()
                .map(this::mapToWebResponse)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public MenuWebResponse getMenu(@PathVariable Long id) {
        Menu menu = getMenuUseCase.getMenuById(id);
        return mapToWebResponse(menu);
    }

    private MenuWebResponse mapToWebResponse(Menu menu) {
        return MenuWebResponse.builder()
                .id(menu.getId())
                .korName(menu.getKorName())
                .engName(menu.getEngName())
                .description(menu.getDescription())
                .price(menu.getPrice())
                .categoryName(menu.getCategory() != null ? menu.getCategory().getName() : "기타")
                .isAvailable(menu.getIsAvailable())
                .createdAt(menu.getCreatedAt())
                .build();
    }
}
