package com.quantasnet.defender.security;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.security.oauth2.jwt.JwtValidators;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;

import net.minidev.json.JSONArray;

@Configuration
@EnableConfigurationProperties(AuthConfig.class)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final Logger logger = LoggerFactory.getLogger(SecurityConfig.class);

    private final AuthConfig authConfig;

    SecurityConfig(final AuthConfig authConfig) {
        this.authConfig = authConfig;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests().antMatchers("/api/auth/config", "/api/protect").permitAll();
        http.authorizeRequests().anyRequest().authenticated();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.oauth2ResourceServer().jwt().jwtAuthenticationConverter(grantedAuthoritiesExtractor());
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        logger.info("Configuring OAuth2 via {}", determineStsServerAccess());

        // Read the configuration from the internal STS Address if it exists, otherwise the public address
        var jwtDecoder = (NimbusJwtDecoder) JwtDecoders.fromIssuerLocation(determineStsServerAccess());

        jwtDecoder.setJwtValidator(new DelegatingOAuth2TokenValidator<>(
            // We need to validate the public Issuer URL always, the internal one won't match
            JwtValidators.createDefaultWithIssuer(authConfig.getStsServer())
        ));

        return jwtDecoder;
    }

    private String determineStsServerAccess() {
        return null == authConfig.getStsServerInternal() ? authConfig.getStsServer() : authConfig.getStsServerInternal();
    }

    private Converter<Jwt, AbstractAuthenticationToken> grantedAuthoritiesExtractor() {
        var jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(new GrantedAuthoritiesExtractor(authConfig));
        return jwtAuthenticationConverter;
    }

    private static class GrantedAuthoritiesExtractor implements Converter<Jwt, Collection<GrantedAuthority>> {

        private final AuthConfig authConfig;

        GrantedAuthoritiesExtractor(final AuthConfig authConfig) {
            this.authConfig = authConfig;
        }

        public Collection<GrantedAuthority> convert(Jwt jwt) {

            var roles = (JSONArray) mapSearch(jwt.getClaims(), authConfig.getRolesLocation());

            if (null == roles) {
                return Collections.emptyList();
            }

            return roles.stream()
                    .map(role -> new SimpleGrantedAuthority((String) role))
                    .collect(Collectors.toList());
        }

        public Object mapSearch(final Map<String, ?> map, final String search) {
            var keys = Arrays.asList(search.split("\\."));

            return getValueForKeyPath(map, keys);
        }

        public Object getValueForKeyPath(Map<String, ?> map, List<String> keys) {
            if (keys.size() == 1) {
                return map.get(keys.get(0));
            }
            return getValueForKeyPath((Map<String, ?>) map.get(keys.get(0)), keys.subList(1, keys.size()));
        }
    }

}