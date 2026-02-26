package com.new_cafe.app.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import javax.sql.DataSource;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(Customizer.withDefaults()) // Enable CORS for API
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/**").permitAll() // Login/Logout APIs
                .requestMatchers("/cookie/create").authenticated() // Example protected path
                .anyRequest().permitAll()
            )
            .exceptionHandling(ex -> ex
                .authenticationEntryPoint((request, response, authException) -> {
                    response.sendError(401, "Unauthorized");
                })
            );

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService(DataSource dataSource) {
        JdbcUserDetailsManager manager = new JdbcUserDetailsManager(dataSource);
        
        // nickname을 username으로 사용, 비밀모델은 평문 비밀번호이므로 {noop} 접두어 추가
        // PostgreSQL에서는 백틱(`) 대신 큰따옴표(")를 사용하거나 생략하며, username, password, enabled 3개 컬럼이 필요합니다.
        manager.setUsersByUsernameQuery("select nickname as username, '{noop}' || password as password, true as enabled from users where nickname = ?");
        
        // nickname, authority 컬럼이 순서대로 필요합니다.
        manager.setAuthoritiesByUsernameQuery("select nickname as username, role as authority from users where nickname = ?");
        
        return manager;
    }
}
