# N-Cafe Backend Hexagonal Architecture Structure

이 문서는 프로젝트의 헥사고날 아키텍처 구조를 설명합니다. 각 도메인은 독립된 시스템으로 관리됩니다.

## 📂 도메인별 디렉토리 구조

### 1. Menu 도메인 (`com.new_cafe.app.backend.menu`)
```text
├── domain
│   ├── Menu.java                   # 메뉴 도메인 모델 (Pure POJO)
│   └── MenuImage.java              # 메뉴 이미지 도메인 모델
├── application
│   ├── port
│   │   ├── in (GetMenuUseCase)     # 메뉴 조회 통로
│   │   └── out (LoadMenuPort)      # 데이터 로드 명세
│   └── service (MenuService)       # 조회 로직 구현
└── adapter
    ├── in.web (MenuWebAdapter)     # REST API
    │   └── dto                     # Web 전용 DTO 모음
    └── out.persistence             # JPA 연동 (JpaEntity, Mapper, Adapter)
```

### 2. Category 도메인 (`com.new_cafe.app.backend.category`)
```text
├── domain
│   └── Category.java               # 카테고리 도메인 모델 (Pure POJO)
├── application
│   ├── port
│   │   ├── in (ManageCategoryUseCase) # 카테고리 관리 통로
│   │   └── out (LoadCategoryPort)     # 데이터 로드 명세
│   └── service (CategoryService)      # 관리 로직 구현
└── adapter
    ├── in.web (CategoryWebAdapter)    # REST API
    │   └── dto                        # Web 전용 DTO 모음
    └── out.persistence                # JPA 연동 (JpaEntity, Mapper, Adapter)
```

### 3. Auth 도메인 (`com.new_cafe.app.backend.auth`)
*인증 및 관리자 세션 관리 담당 (구조 동일)*

---

## 🚀 아키텍처 핵심 가이드
1.  **Strict Separation**: 도메인 간의 참조는 최소화하며, 필요한 경우 `domain` 수준의 객체만 참조합니다.
2.  **Mapping Isolation**: 각 도메인은 고유한 `Web DTO`와 `JPA Entity`를 가지며, 계층 간 이동 시 반드시 매핑을 거칩니다.
3.  **Encapsulation**: 서비스 구현체와 리포지토리는 `package-private`으로 숨기고 포트(Port)를 통해서만 외부에 노출합니다.
