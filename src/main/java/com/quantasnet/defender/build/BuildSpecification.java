package com.quantasnet.defender.build;

import com.quantasnet.defender.DefenderSpecification;

public class BuildSpecification extends DefenderSpecification<Build> {
    public BuildSpecification(final String filter) {
        super(filter, "app.groupId", "app.artifactId", "version");
    }
}
