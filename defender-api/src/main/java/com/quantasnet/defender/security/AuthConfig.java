package com.quantasnet.defender.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("auth")
public class AuthConfig {

    @JsonProperty("stsServer")
    private String stsServer;

    @JsonProperty("client_id")
    private String clientId = "defender-client";

    @JsonIgnore
    private String rolesLocation;

    public String getStsServer() {
        return stsServer;
    }

    public void setStsServer(String stsServer) {
        this.stsServer = stsServer;
    }


    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getRolesLocation() {
        return rolesLocation;
    }

    public void setRolesLocation(String rolesLocation) {
        this.rolesLocation = rolesLocation;
    }

}