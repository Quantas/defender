package com.quantasnet.defender.protect;

import java.time.OffsetDateTime;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import com.quantasnet.defender.DefenderType;
import com.quantasnet.defender.app.App;
import com.quantasnet.defender.app.AppService;
import com.quantasnet.defender.build.Build;
import com.quantasnet.defender.build.BuildDependency;
import com.quantasnet.defender.build.BuildService;
import com.quantasnet.defender.dependency.Dependency;
import com.quantasnet.defender.dependency.DependencyService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class ProtectService {

    private static final Logger LOG = LoggerFactory.getLogger(ProtectService.class);

    private final BuildService buildService;
    private final DependencyService dependencyService;
    private final AppService appService;

    public ProtectService(final BuildService buildService, final DependencyService dependencyService, final AppService appService) {
        this.buildService = buildService;
        this.dependencyService = dependencyService;
        this.appService = appService;
    }


    @Transactional
    public Build protect(final ProtectBuild build, final DefenderType defenderType) {
        LOG.info("build = user:{}, app:{}", build.getUser(), build.getApp());

        final App app = appService.retrieve(
                build.getApp().getGroupId(),
                build.getApp().getArtifactId(),
                defenderType,
                build.getApp().getDescription(),
                build.getApp().getLicense(),
                build.getApp().getUrl(),
                build.getApp().getRepository()
        );

        final Build newBuild = new Build();
        newBuild.setUserName(build.getUser());
        newBuild.setApp(app);
        newBuild.setVersion(build.getApp().getVersion());
        newBuild.setBuildTime(OffsetDateTime.now());

        newBuild.setBuildDependencies(build.getArtifacts().stream().map(protectArtifact -> {
            final Dependency dependency = dependencyService.retrieve(protectArtifact.getGroupId(), protectArtifact.getArtifactId(), protectArtifact.getVersion(), defenderType, build.getUser());

            final BuildDependency buildDependency = new BuildDependency();
            buildDependency.setDependency(dependency);
            buildDependency.setDependencyStatus(dependency.getDependencyStatus());
            buildDependency.setScope(protectArtifact.getScope());
            buildDependency.setTransitive(protectArtifact.isTransitive());
            return buildDependency;

        }).collect(Collectors.toSet()));

        newBuild.setPassed(true);

        for (final BuildDependency dep : newBuild.getBuildDependencies()) {
            if (!dep.getDependencyStatus().isApproved()) {
                newBuild.setPassed(false);
                break;
            }
        }

        return buildService.save(newBuild);
    }

}