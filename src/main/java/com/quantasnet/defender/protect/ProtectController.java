package com.quantasnet.defender.protect;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/protect")
public class ProtectController {

    private static final Logger LOG = LoggerFactory.getLogger(ProtectController.class);

    @PostMapping
    public boolean protect(@RequestBody final ProtectBuild build) {
        LOG.info("build = user:{}, app:{}", build.getUser(), build.getApp());

        build.getArtifacts().forEach(protectArtifact -> {
            LOG.info("{}", protectArtifact);
        });

        return true;
    }
}
