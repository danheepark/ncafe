package com.new_cafe.app.backend.menu.domain;

import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

/**
 * [Pure Domain Model] Menu
 * 외부 기술(JPA, HTTP 등)에 의존하지 않는 순수 도메인 객체
 */
@Getter
@Builder
@AllArgsConstructor
public class Menu {

    private final Long id;
    private final String korName;
    private final String engName;
    private final String description;
    private final Integer price;
    private final Long categoryId;
    private final String categoryName;
    private final Boolean isAvailable;
    private final List<MenuImage> images;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;
}