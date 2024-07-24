package com.cinemas.configuration;

import com.cinemas.enums.RoleType;
import com.cinemas.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
    private final JwtTokenFilter jwtTokenFilter;

    private final UserService userService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(request -> request
                        .requestMatchers(
                                "/api/auth/**",
                                "/api/admin/celebrity/**",
                                "/api/admin/cinema/**",
                                "/api/admin/watercorn/**",
                                "/api/admin/movie/**",
                                "/api/admin/movie-genre/**",
                                "/api/admin/user/**",
                                "/api/admin/room/**",
                                "/api/admin/show-time/**",
                                "/api/admin/review/**",
                                "/api/admin/movie-blog/**",
                                "/api/admin/promotion/**",
                                "/api/admin/voucher/**",
                                "/api/admin/booking/**",
                                "/api/home/carousel/**",
                                "/api/admin/file-upload",
                                "/api/home/movie/**",
                                "/api/home/celebrity/**",
                                "/api/home/blog/**",
                                "/api/home/review/**",
                                "/api/home/booking/**",
                                "/api/home/home/**",
                                "/api/home/cinema/**",
                                "/api/home/buy-ticket/**",
                                "/api/home/watercorn/**",
                                "/api/home/user/**",
                                "/api/home/movie-genre/**",
                                "/api/payment/**",
                                "/api/home/promotion/**").permitAll()
                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
                        .requestMatchers("/api/admin").hasAnyAuthority(RoleType.ADMIN.name())
                        .requestMatchers("/api/user").hasAnyAuthority(RoleType.USER.name())
                        .anyRequest().authenticated())

                .sessionManagement(mannager -> mannager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(handler -> handler.authenticationEntryPoint(new JwtAuthenticationEntryPoint()));
        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userService.userDetailsService());
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}
