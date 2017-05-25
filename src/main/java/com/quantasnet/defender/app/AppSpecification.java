package com.quantasnet.defender.app;

import com.quantasnet.defender.DefenderSpecification;

public class AppSpecification extends DefenderSpecification<App> {
    public AppSpecification(final String filter) {
        super(filter, "groupId", "artifactId", "type");
    }
}
