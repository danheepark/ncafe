package com.new_cafe.app.backend.controller.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.new_cafe.app.backend.entity.Category;
import com.new_cafe.app.backend.service.CategoryService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/admin/categories")
    public List<Category> list() {
        return categoryService.getAll();
    }

    @PostMapping("/admin/categories")
    public String reg(Category category) {
        categoryService.add(category);
        return "redirect:categories";
    }
}
