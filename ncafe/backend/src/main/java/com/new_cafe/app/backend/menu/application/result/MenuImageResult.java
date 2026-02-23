package com.new_cafe.app.backend.menu.application.result;

import com.new_cafe.app.backend.menu.domain.MenuImage;

/**
 * [Result] 메뉴 이미지 정보 결과
 */
public record MenuImageResult(
        Long id,
        String srcUrl,
        Integer sortOrder
) {
    public static MenuImageResult from(MenuImage image) {
        return new MenuImageResult(
                image.getId(),
                image.getSrcUrl(),
                image.getSortOrder()
        );
    }
}
