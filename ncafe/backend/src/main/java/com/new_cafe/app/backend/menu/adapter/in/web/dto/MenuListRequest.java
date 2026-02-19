package com.new_cafe.app.backend.menu.adapter.in.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MenuListRequest {
    private Integer categoryId;
    private String searchQuery;
}
