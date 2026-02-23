package com.new_cafe.app.backend.admin.category.application.port.out;

import com.new_cafe.app.backend.category.domain.Category;
import java.util.List;
import java.util.Optional;

public interface CategoryPort {
    List<Category> findAll();
    Optional<Category> findById(Long id);
    Category save(Category category);
    void deleteById(Long id);
}
