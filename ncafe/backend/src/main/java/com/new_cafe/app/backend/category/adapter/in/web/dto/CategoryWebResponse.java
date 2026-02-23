package com.new_cafe.app.backend.category.adapter.in.web.dto;

import com.new_cafe.app.backend.category.application.result.CategoryResult;
import lombok.Builder;
import lombok.Getter;

/**
 * [Web DTO] Category 응답
 */
@Getter
@Builder
public class CategoryWebResponse {
    private final Long id;
    private final String name;
    private final String icon;
    private final Integer sortOrder;

    public static CategoryWebResponse from(CategoryResult result) {
        return CategoryWebResponse.builder()
                .id(result.id())
                .name(result.name())
                .icon(result.icon())
                .sortOrder(result.sortOrder())
                .build();
    }
}
