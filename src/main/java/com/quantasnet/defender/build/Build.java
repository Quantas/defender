package com.quantasnet.defender.build;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
public class Build {

    @Id
    @GeneratedValue
    private Long id;

    private String groupId;
    private String artifactId;
    private String version;

    private String userName;

    private LocalDateTime buildTime;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<BuildArtifact> buildArtifacts;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public String getArtifactId() {
        return artifactId;
    }

    public void setArtifactId(String artifactId) {
        this.artifactId = artifactId;
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

    public LocalDateTime getBuildTime() {
        return buildTime;
    }

    public void setBuildTime(LocalDateTime buildTime) {
        this.buildTime = buildTime;
    }

    public Set<BuildArtifact> getBuildArtifacts() {
        return buildArtifacts;
    }

    public void setBuildArtifacts(Set<BuildArtifact> buildArtifacts) {
        this.buildArtifacts = buildArtifacts;
    }
}
