package com.new_cafe.app.backend.menu.adapter.in.web.dto;

import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;

/**
 * [Web DTO] 메뉴 상세 응답 객체
 */
@Getter
@Builder
public class MenuWebResponse {
    private final Long id;
    private final String korName;
    private final String engName;
    private final String description;
    private final Integer price;
    private final String categoryName;
    private final Boolean isAvailable;
    private final LocalDateTime createdAt;
}
