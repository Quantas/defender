package com.quantasnet.defender;

import java.util.HashSet;
import java.util.Set;

import javax.annotation.PostConstruct;

import com.quantasnet.defender.build.BuildService;
import com.quantasnet.defender.protect.ProtectArtifact;
import com.quantasnet.defender.protect.ProtectBuild;
import com.quantasnet.defender.protect.ProtectService;

import org.springframework.stereotype.Component;

@Component
public class DatabasePopulator {

    private final ProtectService protectService;
    private final BuildService buildService;

    public DatabasePopulator(final ProtectService protectService, final BuildService buildService) {
        this.protectService = protectService;
        this.buildService = buildService;
    }

    @PostConstruct
    public void postConstruct() {
        if (buildService.count() == 0L) {
            final ProtectArtifact app = new ProtectArtifact();
            app.setGroupId("com.sample.app");
            app.setArtifactId("test-app");
            app.setVersion("1.0.0-SNAPSHOT");
            app.setDescription("Sample Application");
            app.setLicense("MIT");
            app.setRepository("https://github.com");
            app.setUrl("https://www.sample.com");

            final ProtectArtifact dep1 = new ProtectArtifact();
            dep1.setGroupId("com.sample.dep");
            dep1.setArtifactId("test-dep");
            dep1.setVersion("1.0.0");
            dep1.setScope("compile");
            dep1.setTransitive(false);

            final Set<ProtectArtifact> deps = new HashSet<>();
            deps.add(dep1);

            final ProtectBuild testBuild = new ProtectBuild();
            testBuild.setApp(app);
            testBuild.setArtifacts(deps);
            testBuild.setUser("sample");

            protectService.protect(testBuild, DefenderType.MAVEN);
        }
    }
}