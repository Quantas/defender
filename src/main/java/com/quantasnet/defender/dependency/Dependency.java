package com.quantasnet.defender.dependency;

import com.quantasnet.defender.DefenderType;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Dependency {

    @Id
    @GeneratedValue
    private Long id;

    private String groupId;
    private String artifactId;
    private String version;

    private DefenderType type;

    private DependencyStatus dependencyStatus;

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

    public DefenderType getType() {
        return type;
    }

    public void setType(DefenderType type) {
        this.type = type;
    }

    public DependencyStatus getDependencyStatus() {
        return dependencyStatus;
    }

    public void setDependencyStatus(DependencyStatus dependencyStatus) {
        this.dependencyStatus = dependencyStatus;
    }

    @Override
    public String toString() {
        return "Dependency{" +
                "id=" + id +
                ", groupId='" + groupId + '\'' +
                ", artifactId='" + artifactId + '\'' +
                ", version='" + version + '\'' +
                ", type='" + type + '\'' +
                ", dependencyStatus=" + dependencyStatus +
                '}';
    }
}
