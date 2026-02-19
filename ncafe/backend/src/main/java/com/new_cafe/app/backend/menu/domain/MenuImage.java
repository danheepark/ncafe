package com.new_cafe.app.backend.menu.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuImage {
    private Long id;
    private Long menuId;
    private String srcUrl;
    private LocalDateTime createdAt;
    private Integer sortOrder;
}
