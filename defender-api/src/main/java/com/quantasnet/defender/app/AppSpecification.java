package com.quantasnet.defender.app;

import com.quantasnet.defender.DefenderSpecification;

public class AppSpecification extends DefenderSpecification<App> {

    private static final long serialVersionUID = 1L;

    public AppSpecification(final String filter) {
        super(filter, "groupId", "artifactId", "type");
    }
}
