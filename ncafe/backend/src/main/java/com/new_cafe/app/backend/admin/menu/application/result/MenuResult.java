package com.new_cafe.app.backend.admin.menu.application.result;

import com.new_cafe.app.backend.menu.domain.Menu;

import java.time.LocalDateTime;

/**
 * [Result] 관리자용 메뉴 조회 결과
 */
public record MenuResult(
        Long id,
        String korName,
        String engName,
        String description,
        Integer price,
        Long categoryId,
        String categoryName,
        Boolean isAvailable,
        java.util.List<String> imageUrls,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static MenuResult from(Menu menu) {
        return new MenuResult(
                menu.getId(),
                menu.getKorName(),
                menu.getEngName(),
                menu.getDescription(),
                menu.getPrice(),
                menu.getCategoryId(),
                menu.getCategoryName(),
                menu.getIsAvailable(),
                menu.getImages() != null ? menu.getImages().stream().map(com.new_cafe.app.backend.menu.domain.MenuImage::getSrcUrl).collect(java.util.stream.Collectors.toList()) : java.util.Collections.emptyList(),
                menu.getCreatedAt(),
                menu.getUpdatedAt()
        );
    }
}
