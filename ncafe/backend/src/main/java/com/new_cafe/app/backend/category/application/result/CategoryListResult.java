package com.new_cafe.app.backend.category.application.result;

import com.new_cafe.app.backend.category.domain.Category;

import java.util.List;
import java.util.stream.Collectors;

/**
 * [Result] 카테고리 목록 결과
 */
public record CategoryListResult(
        List<CategoryResult> categories,
        int total
) {
    public static CategoryListResult from(List<Category> categories) {
        List<CategoryResult> results = categories.stream()
                .map(CategoryResult::from)
                .collect(Collectors.toList());
        return new CategoryListResult(results, results.size());
    }
}
