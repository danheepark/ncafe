package com.new_cafe.app.backend.menu.adapter.out.persistence;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "menu_images")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuImageJpaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "menu_id")
    private Long menuId;

    @Column(name = "src_url")
    private String srcUrl;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "sort_order")
    private Integer sortOrder;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
