package com.new_cafe.app.backend.menu.adapter.in.web.dto;

import com.new_cafe.app.backend.menu.application.result.MenuImageResult;
import lombok.Builder;
import lombok.Getter;

/**
 * [Web DTO] 메뉴 이미지 웹 응답
 */
@Getter
@Builder
public class MenuImageWebResponse {
    private final Long id;
    private final String srcUrl;
    private final Integer sortOrder;

    public static MenuImageWebResponse from(MenuImageResult result) {
        return MenuImageWebResponse.builder()
                .id(result.id())
                .srcUrl(result.srcUrl())
                .sortOrder(result.sortOrder())
                .build();
    }
}
