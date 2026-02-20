package com.new_cafe.app.backend.menu.domain;

import jakarta.persistence.*; // 중요!
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;
import com.new_cafe.app.backend.category.domain.Category;
import com.new_cafe.app.backend.menu.domain.MenuImage;

@Data
@NoArgsConstructor // JPA 엔티티는 기본 생성자가 필수입니다
@AllArgsConstructor
@Builder
@Entity // << 1. 이 클래스를 DB 테이블로 만들겠다고 선언
public class Menu {

    @Id // << 3. PK(기본키) 설정
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 번호 자동 증가
    private Long id;

    private String korName;
    private String engName;
    private String description;
    private Integer price;
    private Long categoryId;
    private Boolean isAvailable;

    // 강사님이 추가하신 부분!
    // DB 테이블 컬럼으로 만들지 않고 자바에서만 쓸 필드에 붙입니다.
    @Transient
    private Category category;

    @Transient
    private List<MenuImage> images;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}