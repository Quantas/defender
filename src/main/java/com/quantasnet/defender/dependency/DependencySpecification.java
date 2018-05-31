package com.quantasnet.defender.dependency;

import com.quantasnet.defender.DefenderSpecification;

public class DependencySpecification extends DefenderSpecification<Dependency> {

    public DependencySpecification(final String filter) {
        super(filter, "groupId", "artifactId", "version", "dependencyStatus.status");
    }
}
