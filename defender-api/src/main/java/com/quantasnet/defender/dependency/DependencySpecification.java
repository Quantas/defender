package com.quantasnet.defender.dependency;

import com.quantasnet.defender.DefenderSpecification;

public class DependencySpecification extends DefenderSpecification<Dependency> {

    private static final long serialVersionUID = 1L;

    public DependencySpecification(final String filter) {
        super(filter, "groupId", "artifactId", "version", "dependencyStatus.status");
    }
}
