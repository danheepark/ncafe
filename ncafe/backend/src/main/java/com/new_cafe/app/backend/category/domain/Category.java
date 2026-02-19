package com.new_cafe.app.backend.category.domain;

import lombok.Builder;
import lombok.Getter;

/**
 * [Pure Domain Model] Category
 * 메뉴와 별개의 독립된 도메인으로 관리됩니다.
 */
@Getter
@Builder
public class Category {
    private final Long id;
    private final String name;
    private final String icon;
    private final Integer sortOrder;
}
