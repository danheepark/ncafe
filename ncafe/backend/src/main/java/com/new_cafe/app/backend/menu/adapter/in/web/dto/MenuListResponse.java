package com.new_cafe.app.backend.menu.adapter.in.web.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.new_cafe.app.backend.menu.domain.Menu;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MenuListResponse { 
    private List<MenuResponse> menus;
    private int total;

    public static MenuListResponse of(List<Menu> menus) {
        List<MenuResponse> menuResponses = menus.stream()
                .map(MenuResponse::from)
                .collect(Collectors.toList());

        return MenuListResponse.builder()
                .menus(menuResponses)
                .total(menuResponses.size())
                .build();
    }
}
