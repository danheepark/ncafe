package com.new_cafe.app.backend.admin.menu.adapter.in.web.dto;

import com.new_cafe.app.backend.admin.menu.application.result.MenuResult;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

/**
 * [Web DTO] 관리자용 메뉴 응답
 */
@Getter
@Builder
public class MenuWebResponse {
    private final Long id;
    private final String korName;
    private final String engName;
    private final String description;
    private final Integer price;
    private final Long categoryId;
    private final String categoryName;
    private final Boolean isAvailable;
    private final java.util.List<String> imageUrls;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;

    public static MenuWebResponse from(MenuResult result) {
        return MenuWebResponse.builder()
                .id(result.id())
                .korName(result.korName())
                .engName(result.engName())
                .description(result.description())
                .price(result.price())
                .categoryId(result.categoryId())
                .categoryName(result.categoryName())
                .isAvailable(result.isAvailable())
                .imageUrls(result.imageUrls())
                .createdAt(result.createdAt())
                .updatedAt(result.updatedAt())
                .build();
    }
}
