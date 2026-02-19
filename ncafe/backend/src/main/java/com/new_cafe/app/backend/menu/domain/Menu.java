package com.new_cafe.app.backend.menu.domain;

import com.new_cafe.app.backend.category.domain.Category;
import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;

/**
 * [Pure Domain Model] Menu
 * 기술적인 애노테이션(JPA, Jackson 등)이 없는 순수 비즈니스 객체입니다.
 */
@Getter
@Builder
public class Menu {
    private final Long id;
    private final String korName;
    private final String engName;
    private final String description;
    private final Integer price;
    private final Long categoryId;
    private final Boolean isAvailable;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;

    // 비즈니스 데이터
    private final Category category;
}
