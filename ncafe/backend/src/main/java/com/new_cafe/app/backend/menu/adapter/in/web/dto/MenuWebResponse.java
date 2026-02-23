package com.new_cafe.app.backend.menu.adapter.in.web.dto;

import com.new_cafe.app.backend.menu.application.result.MenuResult;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * [Web DTO] 메뉴 단일 응답 (이미지 포함)
 */
@Getter
@Builder
public class MenuWebResponse {
    private final Long id;
    private final String korName;
    private final String engName;
    private final String description;
    private final Integer price;
    private final String categoryName;
    private final Boolean isAvailable;
    private final List<MenuImageWebResponse> images; // 🆕 이미지 리스트 추가
    private final LocalDateTime createdAt;

    public static MenuWebResponse from(MenuResult result) {
        List<MenuImageWebResponse> imageResponses = null;
        if (result.images() != null) {
            imageResponses = result.images().stream()
                    .map(MenuImageWebResponse::from)
                    .collect(Collectors.toList());
        }

        return MenuWebResponse.builder()
                .id(result.id())
                .korName(result.korName())
                .engName(result.engName())
                .description(result.description())
                .price(result.price())
                .categoryName(result.categoryName())
                .isAvailable(result.isAvailable())
                .images(imageResponses)
                .createdAt(result.createdAt())
                .build();
    }
}
