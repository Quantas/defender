package com.quantasnet.defender.build;

import com.quantasnet.defender.app.App;

import java.time.OffsetDateTime;

public class BuildWrapper {
    private final App app;
    private final String version;
    private final long id;
    private final OffsetDateTime buildTime;

    public BuildWrapper(App app, String version, long id, OffsetDateTime buildTime) {
        this.app = app;
        this.version = version;
        this.id = id;
        this.buildTime = buildTime;
    }

    public App getApp() {
        return app;
    }

    public String getVersion() {
        return version;
    }

    public long getId() {
        return id;
    }

    public OffsetDateTime getBuildTime() {
        return buildTime;
    }
}
