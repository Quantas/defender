package com.quantasnet.defender.protect;

import java.util.Set;

public class ProtectBuild {
    private String user;
    private ProtectArtifact app;
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
