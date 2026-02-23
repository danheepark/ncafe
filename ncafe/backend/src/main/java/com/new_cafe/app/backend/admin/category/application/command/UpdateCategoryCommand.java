package com.new_cafe.app.backend.admin.category.application.command;

public record UpdateCategoryCommand(Long id, String name, String icon, Integer sortOrder) {}
