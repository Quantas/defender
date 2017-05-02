package com.quantasnet.defender.protect;

import com.quantasnet.defender.build.Build;
import com.quantasnet.defender.build.BuildArtifact;
import com.quantasnet.defender.build.BuildRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/protect")
public class ProtectController {

    private static final Logger LOG = LoggerFactory.getLogger(ProtectController.class);

    private final BuildRepository buildRepository;

    public ProtectController(final BuildRepository buildRepository) {
        this.buildRepository = buildRepository;
    }

    @PostMapping
    public boolean protect(@RequestBody final ProtectBuild build) {
        LOG.info("build = user:{}, app:{}", build.getUser(), build.getApp());

        build.getArtifacts().forEach(protectArtifact -> {
            LOG.info("{}", protectArtifact);
        });

        final Build newBuild = new Build();
        newBuild.setUserName(build.getUser());
        newBuild.setGroupId(build.getApp().getGroupId());
        newBuild.setArtifactId(build.getApp().getArtifactId());
        newBuild.setVersion(build.getApp().getVersion());
        newBuild.setBuildTime(LocalDateTime.now());

        newBuild.setBuildArtifacts(build.getArtifacts().stream().map(protectArtifact -> {
            final BuildArtifact buildArtifact = new BuildArtifact();
            buildArtifact.setGroupId(protectArtifact.getGroupId());
            buildArtifact.setArtifactId(protectArtifact.getArtifactId());
            buildArtifact.setVersion(protectArtifact.getVersion());
            buildArtifact.setScope(protectArtifact.getScope());
            buildArtifact.setTransitive(protectArtifact.isTransitive());
            return buildArtifact;
        }).collect(Collectors.toSet()));

        final Build newBuildSaved = this.buildRepository.save(newBuild);
        LOG.info("new id ={}", newBuildSaved.getId());
        return true;
    }
}
