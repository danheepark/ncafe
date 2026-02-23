package com.new_cafe.app.backend.category.application.result;

import com.new_cafe.app.backend.category.domain.Category;

/**
 * [Result] 단일 카테고리 결과
 */
public record CategoryResult(
        Long id,
        String name,
        String icon,
        Integer sortOrder
) {
    public static CategoryResult from(Category category) {
        return new CategoryResult(
                category.getId(),
                category.getName(),
                category.getIcon(),
                category.getSortOrder()
        );
    }
}
