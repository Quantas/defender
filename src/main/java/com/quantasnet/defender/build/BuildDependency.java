package com.quantasnet.defender.build;

import com.quantasnet.defender.dependency.Dependency;
import com.quantasnet.defender.dependency.DependencyStatus;

import javax.persistence.*;

@Entity
public class BuildDependency {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(optional = false)
    private Dependency dependency;

    @Enumerated(EnumType.STRING)
    private DependencyStatus status;

    private boolean approved;

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

    public DependencyStatus getStatus() {
        return status;
    }

    public void setStatus(DependencyStatus status) {
        this.status = status;
    }

    public boolean isApproved() {
        return approved;
    }

    public void setApproved(boolean approved) {
        this.approved = approved;
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
