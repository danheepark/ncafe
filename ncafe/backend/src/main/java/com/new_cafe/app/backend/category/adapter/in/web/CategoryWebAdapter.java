package com.new_cafe.app.backend.category.adapter.in.web;

import com.new_cafe.app.backend.category.application.port.in.ManageCategoryUseCase;
import com.new_cafe.app.backend.category.domain.Category;
import com.new_cafe.app.backend.category.adapter.in.web.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

/**
 * [Web Adapter] 카테고리 컨트롤러
 */
@RestController
@RequestMapping("/api/admin/categories")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CategoryWebAdapter {

    private final ManageCategoryUseCase manageCategoryUseCase;

    @GetMapping
    public List<CategoryWebResponse> getAllCategories() {
        return manageCategoryUseCase.getAllCategories().stream()
                .map(this::mapToWebResponse)
                .collect(Collectors.toList());
    }

    private CategoryWebResponse mapToWebResponse(Category category) {
        return CategoryWebResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .icon(category.getIcon())
                .sortOrder(category.getSortOrder())
                .build();
    }
}
