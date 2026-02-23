package com.new_cafe.app.backend.admin.category.application.port.in;

import com.new_cafe.app.backend.admin.category.application.command.*;
import com.new_cafe.app.backend.admin.category.application.result.CategoryResult;
import java.util.List;

public interface ManageCategoryUseCase {
    List<CategoryResult> getAllCategories();
    CategoryResult createCategory(CreateCategoryCommand command);
    CategoryResult updateCategory(UpdateCategoryCommand command);
    void deleteCategory(DeleteCategoryCommand command);
}
