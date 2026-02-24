package com.new_cafe.app.backend.category.adapter.in.web;

import com.new_cafe.app.backend.category.application.command.GetCategoriesCommand;
import com.new_cafe.app.backend.category.application.port.in.GetAllCategoriesUseCase;
import com.new_cafe.app.backend.category.application.result.CategoryListResult;
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
@RestController("customerCategoryController")
@RequestMapping("/categories")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CategoryController {

    private final GetAllCategoriesUseCase getAllCategoriesUseCase;

    @GetMapping
    public List<CategoryWebResponse> getAllCategories() {
        CategoryListResult result = getAllCategoriesUseCase.getAllCategories(new GetCategoriesCommand());
        return result.categories().stream()
                .map(CategoryWebResponse::from)
                .collect(Collectors.toList());
    }
}
