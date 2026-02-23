package com.new_cafe.app.backend.admin.category.application.result;

import com.new_cafe.app.backend.category.domain.Category;

public record CategoryResult(Long id, String name, String icon, Integer sortOrder) {
    public static CategoryResult from(Category category) {
        return new CategoryResult(category.getId(), category.getName(), category.getIcon(), category.getSortOrder());
    }
}
