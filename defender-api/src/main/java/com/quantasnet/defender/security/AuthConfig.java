package com.quantasnet.defender.security;

import com.fasterxml.jackson.annotation.JsonProperty;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("auth")
public class AuthConfig {

    /**
     * The address of your STS server, this must be publically accessible!
     * 
     * Samples:
     * Keycloak = http://localhost:9080/auth/realms/defender
     * AWS Cognito = https://cognito-idp.us-east-2.amazonaws.com/us-east-2_XXXXXXXXX
     */
    private String stsServer;

    /**
     * When running keyclaok or other STS on platform such as Docker/Kubernetes, we can
     * to access our STS via the Internal Address if this value is present
     */
    private String stsServerInternal;

    /**
     * STS ClientId
     */
    @JsonProperty("client_id")
    private String clientId = "defender-client";

    /**
     * The location, in the JWT where the roles are presented.
     * 
     * Samples:
     * Keycloak: realm_access.roles
     * AWS Congnito: cognito:groups
     */
    private String rolesLocation;

    public String getStsServer() {
        return stsServer;
    }

    public void setStsServer(String stsServer) {
        this.stsServer = stsServer;
    }

    public String getStsServerInternal() {
        return stsServerInternal;
    }

    public void setStsServerInternal(String stsServerInternal) {
        this.stsServerInternal = stsServerInternal;
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