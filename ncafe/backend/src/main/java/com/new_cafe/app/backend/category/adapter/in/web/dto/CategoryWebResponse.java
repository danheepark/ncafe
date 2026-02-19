package com.new_cafe.app.backend.category.adapter.in.web.dto;

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
}
