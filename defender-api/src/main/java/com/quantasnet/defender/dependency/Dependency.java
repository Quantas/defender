package com.quantasnet.defender.dependency;

import com.quantasnet.defender.DefenderType;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(indexes = {
        @Index(columnList = "groupId,artifactId,version,type"),
        @Index(columnList = "groupId,artifactId")
})
public class Dependency {

    @Id
    @GeneratedValue
    private Long id;

    private String groupId;
    private String artifactId;
    private String version;

    @Enumerated(EnumType.STRING)
    private DefenderType type;

    @ManyToOne(optional = false)
    private DependencyStatus dependencyStatus;

    @OrderBy("time DESC")
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<DependencyHistory> dependencyHistories;

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

    public List<DependencyHistory> getDependencyHistories() {
        return dependencyHistories;
    }

    public void setDependencyHistories(List<DependencyHistory> dependencyHistories) {
        this.dependencyHistories = dependencyHistories;
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
