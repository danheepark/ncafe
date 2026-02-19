# Menu Domain Hexagonal Architecture Structure

이 문서는 `com.new_cafe.app.backend.menu` 패키지 하위에 구현된 메뉴 도메인의 구조를 설명합니다.
(현재 카테고리 도메인은 `com.new_cafe.app.backend.category`로 분리되었습니다.)

## 📂 디렉토리 구조

```text
com.new_cafe.app.backend.menu
├── domain (순수 비즈니스 레이어)
│   ├── Menu.java                   # 메뉴 도메인 모델 (Pure POJO)
│   └── MenuImage.java              # 메뉴 이미지 도메인 모델 (Pure POJO)
│
├── application (애플리케이션 비즈니스 로직 레이어)
│   ├── port
│   │   ├── in (Input Port)
│   │   │   └── GetMenuUseCase.java         # 메뉴 조회 유스케이스 인터페이스
│   │   └── out (Output Port)
│   │       └── LoadMenuPort.java           # DB 데이터 로드 인터페이스
│   └── service
│       └── MenuService.java                # 유스케이스 구현체 (Internal Service)
│
└── adapter (인프라 및 외부 인터페이스 레이어)
    ├── in.web (Input Adapter)
    │   ├── MenuWebAdapter.java             # REST API 컨트롤러
    │   └── dto                             # Web 전용 DTO 모음
    └── out.persistence (Output Adapter)
        ├── MenuJpaEntity.java              # DB 매핑용 JPA 엔티티
        ├── MenuJpaRepository.java          # Spring Data JPA Repository
        ├── MenuPersistenceMapper.java      # Domain ↔ Entity 변환 매퍼
        └── MenuPersistenceAdapter.java     # LoadMenuPort 구현체
```

---

## 📄 파일별 주요 변경 사항 (도메인 분리 반영)

### 1. Domain
*   `Category.java`가 `com.new_cafe.app.backend.category.domain`으로 이동함에 따라, `Menu.java`는 이제 외부 도메인 객체로 `Category`를 참조합니다.

### 2. Persistence Adapter
*   `CategoryJpaEntity.java`가 `com.new_cafe.app.backend.category.adapter.out.persistence`로 이동했습니다.
*   `MenuJpaEntity.java`는 이제 다른 패키지의 `CategoryJpaEntity`와 연관 관계(`@ManyToOne`)를 맺습니다.
*   `MenuPersistenceMapper.java`도 분리된 카테고리 엔티티/도메인을 참조하여 변환 로직을 수행합니다.

---

## 🚀 아키텍처 원칙
*   **Loose Coupling**: 메뉴와 카테고리는 서로 다른 패키지에 존재하며, 인터페이스와 도메인 모델 수준에서만 최소한으로 협력합니다.
*   **Single Responsibility**: 메뉴 도메인은 오직 메뉴 정보와 메뉴 이미지 관리에만 집중합니다.
