package com.quantasnet.defender.app;

import com.quantasnet.defender.DefenderType;

import javax.persistence.*;

@Entity
@Table(indexes = {
        @Index(columnList = "groupId,artifactId,type")
})
public class App {

    @Id
    @GeneratedValue
    private Long id;

    private String groupId;
    private String artifactId;

    private DefenderType type;

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

    public DefenderType getType() {
        return type;
    }

    public void setType(DefenderType type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "App{" +
                "id=" + id +
                ", groupId='" + groupId + '\'' +
                ", artifactId='" + artifactId + '\'' +
                ", type=" + type +
                '}';
    }
}
