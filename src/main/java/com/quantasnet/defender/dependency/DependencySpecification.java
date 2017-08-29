package com.quantasnet.defender.dependency;

import com.quantasnet.defender.DefenderSpecification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class DependencySpecification extends DefenderSpecification<Dependency> {

    public DependencySpecification(final String filter) {
        super(filter, "groupId", "artifactId", "version", "dependencyStatus.status");
    }
}
