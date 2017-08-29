package com.quantasnet.defender.build;

import com.quantasnet.defender.dependency.Dependency;
import com.quantasnet.defender.dependency.DependencyStatus;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class BuildDependency {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(optional = false)
    private Dependency dependency;

    @ManyToOne(optional = false)
    private DependencyStatus dependencyStatus;

    private String scope;
    private boolean transitive;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Dependency getDependency() {
        return dependency;
    }

    public void setDependency(Dependency dependency) {
        this.dependency = dependency;
    }

    public DependencyStatus getDependencyStatus() {
        return dependencyStatus;
    }

    public void setDependencyStatus(DependencyStatus dependencyStatus) {
        this.dependencyStatus = dependencyStatus;
    }

    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }

    public boolean isTransitive() {
        return transitive;
    }

    public void setTransitive(boolean transitive) {
        this.transitive = transitive;
    }
}
