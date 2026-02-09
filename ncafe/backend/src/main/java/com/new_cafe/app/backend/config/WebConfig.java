package com.new_cafe.app.backend.config;

import org.springframework.lang.NonNull;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(false);
    }

    @Override
    public void addResourceHandlers(@NonNull ResourceHandlerRegistry registry) {
        // /images/** 경로로 upload 폴더의 이미지 서빙
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:./upload/")
                .setCachePeriod(0);

        // 기존 정적 리소스 설정
        registry.addResourceHandler("/**")
                .addResourceLocations("file:./upload/", "classpath:/static/")
                .setCachePeriod(0);
    }
}
