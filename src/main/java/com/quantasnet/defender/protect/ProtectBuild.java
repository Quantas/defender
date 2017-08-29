package com.quantasnet.defender.protect;

import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.Valid;
import java.util.Set;

public class ProtectBuild {

    @NotEmpty
    private String user;

    @Valid
    private ProtectArtifact app;

    @Valid
    @NotEmpty
    private Set<ProtectArtifact> artifacts;

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public ProtectArtifact getApp() {
        return app;
    }

    public void setApp(ProtectArtifact app) {
        this.app = app;
    }

    public Set<ProtectArtifact> getArtifacts() {
        return artifacts;
    }

    public void setArtifacts(Set<ProtectArtifact> artifacts) {
        this.artifacts = artifacts;
    }
}
