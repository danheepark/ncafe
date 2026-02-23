package com.new_cafe.app.backend.menu.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * [Persistence Repository] Menu
 * 다른 패키지(admin 등)에서도 접근할 수 있도록 public으로 공개합니다.
 */
public interface MenuJpaRepository extends JpaRepository<MenuJpaEntity, Long> {
}
