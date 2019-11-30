package com.quantasnet.defender.security;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class OpenIdConfigController {

    private final AuthConfig authConfig;

    public OpenIdConfigController(AuthConfig authConfig) {
        this.authConfig = authConfig;
    }

    @GetMapping("/config")
    public AuthConfig getConfig() {
        return authConfig;
    }
    
}