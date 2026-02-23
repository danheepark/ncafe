package com.new_cafe.app.backend.admin.category.application.service;

import com.new_cafe.app.backend.admin.category.application.command.*;
import com.new_cafe.app.backend.admin.category.application.port.in.ManageCategoryUseCase;
import com.new_cafe.app.backend.admin.category.application.port.out.CategoryPort;
import com.new_cafe.app.backend.admin.category.application.result.CategoryResult;
import com.new_cafe.app.backend.category.domain.Category;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service("adminCategoryService")
@RequiredArgsConstructor
@Transactional
class CategoryService implements ManageCategoryUseCase {

    private final CategoryPort categoryPort;

    @Override
    @Transactional(readOnly = true)
    public List<CategoryResult> getAllCategories() {
        return categoryPort.findAll().stream()
                .map(CategoryResult::from)
                .collect(Collectors.toList());
    }

    @Override
    public CategoryResult createCategory(CreateCategoryCommand command) {
        Category category = Category.builder()
                .name(command.name())
                .icon(command.icon())
                .sortOrder(command.sortOrder())
                .build();
        return CategoryResult.from(categoryPort.save(category));
    }

    @Override
    public CategoryResult updateCategory(UpdateCategoryCommand command) {
        Category category = Category.builder()
                .id(command.id())
                .name(command.name())
                .icon(command.icon())
                .sortOrder(command.sortOrder())
                .build();
        return CategoryResult.from(categoryPort.save(category));
    }

    @Override
    public void deleteCategory(DeleteCategoryCommand command) {
        categoryPort.deleteById(command.id());
    }
}
