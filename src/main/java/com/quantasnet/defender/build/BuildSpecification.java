package com.quantasnet.defender.build;

import com.quantasnet.defender.DefenderSpecification;

public class BuildSpecification extends DefenderSpecification<Build> {

    private static final long serialVersionUID = 1L;

    public BuildSpecification(final String filter) {
        super(filter, "app.groupId", "app.artifactId", "version");
    }
}
