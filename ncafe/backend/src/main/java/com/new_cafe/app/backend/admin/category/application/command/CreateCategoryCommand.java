package com.new_cafe.app.backend.admin.category.application.command;

public record CreateCategoryCommand(String name, String icon, Integer sortOrder) {}
