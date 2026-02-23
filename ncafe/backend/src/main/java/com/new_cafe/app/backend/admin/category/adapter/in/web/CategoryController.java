package com.new_cafe.app.backend.admin.category.adapter.in.web;

import com.new_cafe.app.backend.admin.category.application.command.*;
import com.new_cafe.app.backend.admin.category.application.port.in.ManageCategoryUseCase;
import com.new_cafe.app.backend.admin.category.application.result.CategoryResult;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * [Web Adapter] 관리자용 카테고리 관리 API
 */
@RestController("adminCategoryController")
@RequestMapping("/admin/categories")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CategoryController {

    private final ManageCategoryUseCase manageCategoryUseCase;

    @GetMapping
    public List<CategoryResult> getAllCategories() {
        return manageCategoryUseCase.getAllCategories();
    }

    @PostMapping
    public CategoryResult createCategory(@RequestBody CreateCategoryCommand command) {
        return manageCategoryUseCase.createCategory(command);
    }

    @PutMapping("/{id}")
    public CategoryResult updateCategory(@PathVariable Long id, @RequestBody CreateCategoryCommand command) {
        return manageCategoryUseCase.updateCategory(new UpdateCategoryCommand(id, command.name(), command.icon(), command.sortOrder()));
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Long id) {
        manageCategoryUseCase.deleteCategory(new DeleteCategoryCommand(id));
    }
}
