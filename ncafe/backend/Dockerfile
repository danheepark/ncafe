# ─── Stage 1: Build ───────────────────────────────────────────────────────────
FROM eclipse-temurin:21-jdk-alpine AS builder

WORKDIR /app

# Gradle Wrapper 및 빌드 스크립트 복사
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# 의존성 레이어 캐싱 (소스 변경 시 재다운로드 방지)
RUN chmod +x gradlew && ./gradlew dependencies --no-daemon || true

# 소스 코드 전체 복사
COPY src src

# 실행 가능한 JAR 빌드 (테스트 제외)
RUN ./gradlew bootJar --no-daemon -x test

# ─── Stage 2: Runtime ─────────────────────────────────────────────────────────
FROM eclipse-temurin:21-jre-alpine AS runtime

WORKDIR /app

# 업로드 디렉토리 생성 및 볼륨 마운트 포인트 선언
RUN mkdir -p /app/upload

# 업로드 파일은 컨테이너 외부에서 마운트 (재시작해도 데이터 유지)
VOLUME ["/app/upload"]

# 빌드 단계에서 생성된 JAR 복사
COPY --from=builder /app/build/libs/*.jar app.jar

# 포트 노출
EXPOSE 8080

# 컨테이너 실행 시 JAR 구동
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
