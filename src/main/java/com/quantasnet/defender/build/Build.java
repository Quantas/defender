package com.quantasnet.defender.build;

import com.quantasnet.defender.app.App;

import javax.persistence.*;
import java.time.OffsetDateTime;
import java.util.Set;

@Entity
public class Build {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(optional = false)
    private App app;

    private String version;

    private String userName;

    private OffsetDateTime buildTime;

    private boolean passed;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<BuildDependency> buildDependencies;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public App getApp() {
        return app;
    }

    public void setApp(App app) {
        this.app = app;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public OffsetDateTime getBuildTime() {
        return buildTime;
    }

    public void setBuildTime(OffsetDateTime buildTime) {
        this.buildTime = buildTime;
    }

    public boolean isPassed() {
        return passed;
    }

    public void setPassed(boolean passed) {
        this.passed = passed;
    }

    public Set<BuildDependency> getBuildDependencies() {
        return buildDependencies;
    }

    public void setBuildDependencies(Set<BuildDependency> buildDependencies) {
        this.buildDependencies = buildDependencies;
    }
}
