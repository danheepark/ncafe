package com.new_cafe.app.backend.category.adapter.out.persistence;

import jakarta.persistence.*;
import lombok.*;

/**
 * [Persistence Entity] Category
 */
@Entity
@Table(name = "categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryJpaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String icon;

    @Column(name = "sort_order")
    private Integer sortOrder;
}
