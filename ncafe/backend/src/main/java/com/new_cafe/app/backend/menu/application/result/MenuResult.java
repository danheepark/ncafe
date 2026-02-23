package com.new_cafe.app.backend.menu.application.result;

import com.new_cafe.app.backend.menu.domain.Menu;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * [Result] 단일 메뉴 조회 결과 (이미지 포함)
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
        List<MenuImageResult> images, // 🆕 이미지 리스트 추가
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static MenuResult from(Menu menu) {
        List<MenuImageResult> imageResults = null;
        if (menu.getImages() != null) {
            imageResults = menu.getImages().stream()
                    .map(MenuImageResult::from)
                    .collect(Collectors.toList());
        }

        return new MenuResult(
                menu.getId(),
                menu.getKorName(),
                menu.getEngName(),
                menu.getDescription(),
                menu.getPrice(),
                menu.getCategoryId(),
                menu.getCategoryName(),
                menu.getIsAvailable(),
                imageResults,
                menu.getCreatedAt(),
                menu.getUpdatedAt()
        );
    }
}
